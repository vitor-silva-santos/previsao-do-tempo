const button = document.getElementById("button");
const key = "cc0c5a96f6233db6977b6ad6a8fbf6d6";

function btnClick() {
  const cidade = document.getElementById("cidade").value;
  buscarCidade(cidade);
}

async function buscarCidade(cidade) {
  try {
    let dataCity = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
    ).then((resposta) => resposta.json());

    AtualizarDadosTela(dataCity);
  } catch (err) {
    cidadeNaoEncontrada();
  }
}

function cidadeNaoEncontrada() {
  document.querySelector(".errorMessage").style.display = "block";
  document.querySelector(".errorMessage").innerHTML = "*cidade não encontrada";
}

function AtualizarDadosTela(dados) {
  console.log(dados);
  if (dados.name) {
    document.querySelector(".errorMessage").style.display = "none";
    document.getElementById("cidadeTemp").innerHTML = `Tempo em ${dados.name}`;
  }

  document.querySelector(".temperatura").innerHTML = `${Math.round(
    dados.main.temp
  )}ºC`;
  document.getElementById("descricao").innerHTML = dados.weather[0].description;
  document.getElementById(
    "humidade"
  ).innerHTML = `Humidade: ${dados.main.humidity}%`;
  document.querySelector(
    ".icon-temp"
  ).src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

button.addEventListener("click", btnClick);
