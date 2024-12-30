const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('Connected to WebSocket server');
};

socket.onmessage = event => {
  const data = JSON.parse(event.data);
  document.getElementById('temperature').textContent = data.weather.main.temp.toFixed(2);
  document.getElementById('humidity').textContent = data.weather.main.humidity;
  document.getElementById('aqi').textContent = data.airQuality.aqi;
};

socket.onerror = error => {
  console.error('WebSocket error:', error);
};

socket.onclose = () => {
  console.log('Disconnected from WebSocket server');
};



