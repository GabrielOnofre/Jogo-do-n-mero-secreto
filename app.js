//document.querySelector faz com que eu consiga selecionar uma linha no HTML para modificar
//let titulo = document.querySelector('h1');

//innerHTML faz com que eu consiga inserir minha modificação na linha do HTML
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;  

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'brazilian Portuguese Female', {rate: 1.2});
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10');
}
exibirMensagemInicial();
//function serve atribuir uma ação na linha de código do HTML
//chute é minha váriável para ler o chute do jogador
//meu código verifica o chute do jogador, logo em seguida verifica se está certo ou errado em quantas tentativas
function verificarChute(){
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns, você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p',`O número secreto é menor que ${chute}`);
        }else{           
            exibirTextoNaTela('p',`O número secreto é maior que ${chute}`);
        }
        tentativas++
        limparCampo();        
    }
}
//gerando um número secreto aleátorio, verificando se já foi gerado, caso sim, gerar outro número
function gerarNumero(){
    let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumero();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
//limpando o bloco do chute
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
//função para reiniciar o meu jogo chamando todas as funções que quero reiniciar e desabilitando o botão de novo jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}