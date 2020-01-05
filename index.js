    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(refreshWheatherApp, err=> console.log(err));
        } else {
            alert("Este navegador no cuenta con soporte para geolocalización.");
        }
    }

    async function refreshWheatherApp(position) {
        try {
            const { latitude, longitude} = position.coords;
            const secretKey = 'b72c79dc2c7d18e04ab10d4a200891e7';

            const url = `https://api.darksky.net/forecast/${secretKey}/${latitude},${longitude}?units=uk2&lang=es`;
            let response = await fetch(url);

            if (response.status === 200) {

                let { currently: wheater } = await response.json();

                // Set wheater icon
                document.getElementById('icons').innerHTML = `<canvas id="${wheater.icon}" width="50" height="50"></canvas>`;
                var icons = new Skycons({"color": "#fff"});
                icons.set(wheater.icon, wheater.icon);
                icons.play();

                // Set magnitude
                const magnitudeObj = [
                    { name: 'temperature', unit: '°C' },
                    { name: 'precipProbability', unit: '%' },
                    { name: 'humidity', unit: '%' },
                    { name: 'summary', unit: '' }
                ];

                magnitudeObj.forEach(magnitude => {
                    document.getElementById(magnitude.name).innerHTML = `${wheater[magnitude.name]} ${magnitude.unit}`;
                })

            } else {
                alert('Hubo un error intentando actualizar The WheatherApp, por favor, vuelve a intentarlo.')
            }

        } catch (err) {
            console.log(err)
        }
    };

    document.addEventListener('DOMContentLoaded', function(){ 
        document.getElementById('refreshBtn').addEventListener('click', getLocation, false); // Setting refresh button
        getLocation();
    }, false);