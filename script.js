// DOM Elements
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherIcon = document.getElementById('weather-icon');
const animationContainer = document.getElementById('animation-container');
const body = document.body;

// API Config 
const API_KEY = '50a6e3ba77aa63a3b9382db70ce0e652';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;

// Weather icons mapping
const weatherIcons = {
  '01d': '☀️', // clear sky (day)
  '01n': '🌙', // clear sky (night)
  '02d': '⛅', // few clouds
  '02n': '⛅',
  '03d': '☁️', // scattered clouds
  '03n': '☁️',
  '04d': '☁️', // broken clouds
  '04n': '☁️',
  '09d': '🌧️', // shower rain
  '09n': '🌧️',
  '10d': '🌦️', // rain
  '10n': '🌦️',
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️',
  '13d': '❄️', // snow
  '13n': '❄️',
  '50d': '🌫️', // mist
  '50n': '🌫️'
};

// Initialize with default city
getWeatherData('London');

// Event listeners
searchBtn.addEventListener('click', () => {
  if(searchInput.value.trim()) {
    getWeatherData(searchInput.value);
  }
});

searchInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter' && searchInput.value.trim()) {
    getWeatherData(searchInput.value);
  }
});

// Fetch weather data
async function getWeatherData(city) {
  try {
    const response = await fetch(`${BASE_URL}&q=${city}`);
    const data = await response.json();
    
    if(data.cod === '404') {
      alert('City not found!');
      return;
    }
    
    updateWeatherUI(data);
  } catch(error) {
    console.error('Error fetching weather:', error);
  }
}

// Update UI with weather data
function updateWeatherUI(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} km/h`;
  
  // Set weather icon
  const iconCode = data.weather[0].icon;
  weatherIcon.textContent = weatherIcons[iconCode] || '❓';
  
  // Update theme and animation
  updateThemeAndAnimation(data.weather[0].main);
}

// Update theme and create animations
function updateThemeAndAnimation(weatherCondition) {
  // Clear previous animations
  animationContainer.innerHTML = '';
  
  // Remove existing theme classes
  body.classList.remove('sunny-theme', 'rainy-theme', 'cloudy-theme');
  
  // Apply new theme and animation
  if(weatherCondition.toLowerCase().includes('rain')) {
    body.classList.add('rainy-theme');
    createRainAnimation();
  } 
  else if(weatherCondition.toLowerCase().includes('cloud')) {
    body.classList.add('cloudy-theme');
  } 
  else {
    body.classList.add('sunny-theme');
  }
}

// Create rain animation
function createRainAnimation() {
  // Create 100 raindrops
  for(let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.classList.add('rain-drop');
    
    // Random position and animation speed
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    
    animationContainer.appendChild(drop);
  }
}
