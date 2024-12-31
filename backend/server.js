const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { getWeatherData, getAirQualityData } = require('./utils/fetchData');
const { cleanAndPreprocessData } = require('./utils/cleanAndPreprocessData');
const { detectAnomalies } = require('./utils/detectAnomalies');
const { storeData } = require('./utils/storeData');
const weatherRoutes = require('./routes/weatherRoutes');
const airQualityRoutes = require('./routes/airQualityRoutes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 数据存储
let weatherData = {};
let airQualityData = {};

// 模拟数据源
async function fetchData() {
  try {
    weatherData = await getWeatherData();
    airQualityData = await getAirQualityData();

    // 广播数据到所有连接的客户端
    broadcastData();

    // 清洗和预处理数据
    const cleanedData = cleanAndPreprocessData(weatherData, airQualityData);
    if (cleanedData) {
      weatherData = cleanedData.weatherData;
      airQualityData = cleanedData.airQualityData;

      // 异常检测
      detectAnomalies(airQualityData);

      // 存储数据到InfluxDB
      storeData(weatherData, airQualityData);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// 广播数据到所有连接的客户端
function broadcastData() {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ weather: weatherData, airQuality: airQualityData }));
    }
  });
}

// WebSocket 连接事件
wss.on('connection', ws => {
  console.log('New client connected');
  // 发送初始数据
  ws.send(JSON.stringify({ weather: weatherData, airQuality: airQualityData }));

  // 监听客户端消息
  ws.on('message', message => {
    console.log(`Received: ${message}`);
  });

  // 断开连接事件
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// 中间件
app.use(cors());
app.use(express.json());

// 使用路由
app.use('/api', weatherRoutes);
app.use('/api', airQualityRoutes);

// 启动定时任务每5分钟获取一次数据
setInterval(fetchData, 300000);

// 启动服务器
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
