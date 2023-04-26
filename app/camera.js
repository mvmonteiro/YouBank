const elementoBotaoAcessarCamera = document.querySelector("[data-video-botao]");
const elementoCamera = document.querySelector("[data-camera]");
const elementoVideo = document.querySelector("[data-video]");
const elementoBotaoTirarFoto = document.querySelector("[data-tirar-foto]");
const elementoCanvas = document.querySelector("[data-video-canvas]");
const elementoMensagemConclusao = document.querySelector("[data-mensagem]");
const elementoEnviarFoto = document.querySelector("[data-enviar]");
let imagemURL = "";

elementoBotaoAcessarCamera.addEventListener("click", async function () {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

    elementoBotaoAcessarCamera.style.display = "none";
    elementoCamera.style.display = "block";

    elementoVideo.srcObject = iniciarVideo;
})

elementoBotaoTirarFoto.addEventListener("click", function () {
    elementoCanvas.getContext('2d').drawImage(elementoVideo, 0, 0, elementoCanvas.width, elementoCanvas.height)

    imagemURL = elementoCanvas.toDataURL("image/jpeg");

    elementoCamera.style.display = "none";
    elementoMensagemConclusao.style.display = "block";
})

elementoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes);

    converteRetorno.imagem = imagemURL;

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno));

    window.location.href = "./abrir-conta-form-3.html";
})