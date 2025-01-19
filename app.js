let numeroSecretoMax = 3;
let listaNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 1;

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroSecretoMax + 1);
    let quantidadeListaNumeroSecreto = listaNumerosSorteados.length;
    if (quantidadeListaNumeroSecreto == numeroSecretoMax){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(numeroEscolhido, listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function exibirTextoNaTela(tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTextoNaTela("h1","Jogo do número secreto");
    exibirTextoNaTela("p",`Escolha um número entre 1 e ${numeroSecretoMax}`);
}
mensagemInicial()

function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou");
        let palavraTentativa = numeroTentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${numeroTentativas} ${palavraTentativa}!`
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled")
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é maior");
        } else {
            exibirTextoNaTela("p", "O número secreto é menor");
        }
        numeroTentativas++
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    numeroTentativas = 1;
    limparCampo();
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}