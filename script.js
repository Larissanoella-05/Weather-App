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
