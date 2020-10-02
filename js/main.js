const API = config.MY_KEY;
const submitIp = document.getElementById("submit-ip");
const trackMe = document.getElementById("track");
const ipData = document.getElementById("ip-data");


let layer = new L.StamenTileLayer("toner");
let myMap = L.map("map", {
    zoom: 10
});
myMap.addLayer(layer);

const getLocationData = async(API, IP) => {
    let response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${API}&ipAddress=${IP}`)
        let data = response.json();
        return data
}

const displayLocationData = data => {
    ipData.innerHTML = `
        <h1>your IP is: ${data.ip}</h1>
        <p>city: ${data.location.city}</p>
        <p>country: ${data.location.country}</p>
        <p>region: ${data.location.region}</p>
        <p>postal code: ${data.location.postalCode}</p>
    `
}

const trackLocationData = (API, IP) => {
    getLocationData(API, IP).then(data => {
        console.log(data)
        let marker = L.marker([data.location.lat, data.location.lng])
        marker.addTo(myMap);
        myMap.panTo([data.location.lat, data.location.lng])
        displayLocationData(data);
    }).catch(error => console.log(error.message));
}

submitIp.addEventListener("click", () => {
    let IP = document.getElementById("ip-input").value
    trackLocationData(API, IP);
});

trackMe.addEventListener("click", () => {
    trackLocationData(API, IP="");
});

window.onload = () => {
    trackLocationData(API, IP="");
}
/*
    What was done:
    - Used Leafleft and StamenTile to create a map on screen
    - Able to track IP address and current address using API
*/