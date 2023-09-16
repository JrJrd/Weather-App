document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "your key here";
  const displayWindow = document.getElementById("display");
  const Bookmarklist = document.getElementById("list");
  //const reloadBtn = document.getElementById("reload");

  async function fetchDataLoc(location) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
      );
      const resData = await res.json();
      if (resData.length === 0) {
        console.error("error1");
        return null;
      }
      const { lat, lon } = resData[0];
      const wData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const weatherData = await wData.json();
      return weatherData;
    } catch (error) {
      console.error("Error 2", error);
    }
  }

  function displayWData(data) {
    const temperatureKelvin = data.main.temp;
    const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;
    const description = data.weather[0].description;
    displayWindow.innerHTML = `<p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F</p><p>Condition: ${description}</p>`;
  }
  function bookmarks(location) {
    const newList = document.createElement("li");
    newList.innerHTML = `${location} <button class="remove">Remove</button>`;
    Bookmarklist.appendChild(newList);
    const removeBtn = newList.querySelector(".remove");
    removeBtn.addEventListener("click", () => {
      Bookmarklist.removeChild(newList);
    });
  }

  const searchForm = document.getElementById("form");
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("input");
    const location = input.value;
    const weatherData = await fetchDataLoc(location);
    if (weatherData) {
      displayWData(weatherData);
      bookmarks(location);
    }
  });
});
