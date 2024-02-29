const td = document.querySelectorAll("td")
const input = document.querySelector("input") as HTMLInputElement



const dadosExibir = (data: any) => {
  td[0].innerHTML = data.ip;
  td[1].innerHTML = data.location.region;
  td[2].innerHTML = data.location.timezone;
  td[3].innerHTML = data.isp;
};


const rastrearIP = () => {
  fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_7TBR8bW7Zv5rmDGBKWdEmfMZ8bPCs&ipAddress=${input.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dadosExibir(data)
    })
    .catch((erro) => {
      console.error("ip nao encontrado", erro);
    });
};

const botao = document
  .querySelector("button")
  ?.addEventListener("click", () => {
    rastrearIP();
  });