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
}