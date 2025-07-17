const API_KEY = '50a6e3ba77aa63a3b9382db70ce0e652'; // Get this from https://openweathermap.org/api

function getWeather() {
  const city = document.getElementById("city").value;
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        weatherDiv.innerHTML = <p>City not found.</p>;
        return;
      }

       const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ ${data.main.temp}°C</p>
        <p>☁️ ${data.weather[0].main}</p>
        <p>💨 ${data.wind.speed} m/s</p>
      `;

      weatherDiv.innerHTML = html;
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      weatherDiv.innerHTML = "<p>Error retrieving weather data.</p>";
    });
}

// Toggle dark mode
document.querySelector('.toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});






















