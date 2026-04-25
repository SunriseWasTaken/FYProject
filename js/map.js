// map instance
const map = L.map('map', {
    worldCopyJump: true,
    maxBounds: [[-90, -180], [90, 180]],
    minZoom: 2,
    maxZoom: 18
}).setView([20, 0], 2);

// map colour
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
}).addTo(map);

console.log("map initialized!");