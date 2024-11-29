document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const loader = document.getElementById('loader');
    const weatherContainer = document.getElementById('weatherContainer');
 // Get stored location from localStorage
 const storedLocation = localStorage.getItem('location') || '';
 locationInput.value = storedLocation;
 if (storedLocation) fetchWeather(storedLocation);


 locationInput.addEventListener('input', (e) => {
   const location = e.target.value;
   localStorage.setItem('location', location);
   fetchWeather(location);
 });

 async function fetchWeather(location) {
    try {
      if (location.length < 2) {
        weatherContainer.innerHTML = '';
        return;
      }
 
 
      loader.style.display = 'block';
 
 
 // Fetch location data
 const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
  );
  const geoData = await geoRes.json();


  if (!geoData.results) {
    weatherContainer.innerHTML = `
      <h2>City "${location}" not found</h2>
      <p style="text-align: center; margin-top: 1rem;">Please try another location</p>
    `;
    return;
  }

  const { latitude, longitude, timezone, name, country_code } =
  geoData.results[0];
const displayLocation = `${name} ${convertToFlag(country_code)}`;

 // Fetch weather data
 const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
  );
  const weatherData = await weatherRes.json();


  displayWeather(weatherData.daily, displayLocation);
} catch (err) {
  console.error(err);
  weatherContainer.innerHTML = `
    <h2>City not found</h2>
    <p style="text-align: center; margin-top: 1rem;">Please check the spelling and try again</p>
  `;
} finally {
  loader.style.display = 'none';
}
}

function displayWeather(weather, location) {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = weather;
 
 
    const html = `
              <h2>Weather ${location}</h2>
              <ul class="weather">
                  ${dates
                    .map(
                      (date, i) => `
                      <li class="day">
                          <span>${getWeather(codes[i])}</span>
                          <p>${isToday(date) ? 'Today' : formatDay(date)}</p>
                          <p>${Math.floor(min[i])}° — <strong>${Math.ceil(
                        max[i]
                      )}°</strong></p>
                      </li>
                  `
                    )
                    .join('')}
              </ul>
          `;
 
 
    weatherContainer.innerHTML = html;
  }

  