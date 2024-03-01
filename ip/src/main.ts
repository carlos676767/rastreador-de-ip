const td = document.querySelectorAll("td");
const input = document.querySelector("input") as HTMLInputElement;

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useGeographic } from "ol/proj";
const dadosExibir = (data: any) => {
  td[0].innerHTML = data.ip;
  td[1].innerHTML = data.location.region;
  td[2].innerHTML = data.location.timezone;
  td[3].innerHTML = data.isp;
};

useGeographic();

const rastrearIP = () => {
  fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_7TBR8bW7Zv5rmDGBKWdEmfMZ8bPCs&ipAddress=${input.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.as.route);
      dadosExibir(data);
      fetch(`https://nominatim.openstreetmap.org/search?q=${data.location.region}&format=json`)
        .then((response) => response.json())
        .then((date) => {
          console.log(date[0].lon);
          const map = new Map({
            target: "map",
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
            view: new View({
              center: [JSON.parse(date[0].lon), JSON.parse(date[0].lat)],
              zoom: 2,
            }),
          });

          console.log(map);
        })
        .catch((erro) => {
          console.error("dados incorretos", erro);
        });
    })
    .catch((erro) => {
      console.error("ip nao encontrado", erro);
    });
};

const botao = document.querySelector("button") as HTMLButtonElement;
botao.addEventListener("click", () => {
  rastrearIP();
});
