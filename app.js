window.addEventListener('load', () => {
    let lon; //longitude
    let lat; //latitude
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition
            (position => {
                lon = position.coords.longitude;
                lat = position.coords.latitude;
                const apiKey = '099eeb93539e4f2aa0d4906761040a3b';
                const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        temperatureDegree.textContent = Math.floor(data.data[0].temp);
                        locationTimezone.textContent = data.data[0].timezone;
                        temperatureDescription.textContent = data.data[0].weather.description;
                        document.getElementById('wIcon').src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`

                        // Formula Celsius/Farenheit
                           let Farenheit = ((data.data[0].temp * 9) / 5) + 32;

                        // Change tempetature to Celsius/Farenheit
                          temperatureSection.addEventListener('click', () => {
                             if(temperatureSpan.textContent === '°C') {
                                 temperatureSpan.textContent =  '°F';
                                 temperatureDegree.textContent = Math.floor(Farenheit);
                             } else {
                                temperatureSpan.textContent =  '°C';
                                temperatureDegree.textContent =  Math.floor(data.data[0].temp);
                             }
                             
                          });   
                    });
            });
        }

});
