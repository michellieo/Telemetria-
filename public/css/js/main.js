const map = L.map('map-template').setView([11.014953, -74.820945], 17);

const tileurl = 'https://a.tile.openstreetmap.de/{z}/{x}/{y}.png';
L.tileLayer(tileurl).addTo(map);

//map.locate({ enableHighAccuracy: true });

const marcador = L.marker([11.014953, -74.820945]).bindPopup('Casa de mich')
marcador.addTo(map);