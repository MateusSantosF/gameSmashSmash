var altura = 0;
var largura = 0;
var dificuldadeAtual;
var nVidas = 3;

function pegaTamanho(){
    altura = window.innerHeight - 200 ;
    largura = window.innerWidth - 200;    
}

function mudaDificuldade(){

    dificuldadeAtual = document.getElementById('btnDificuldade').textContent;

    if( dificuldadeAtual == 'easy'){
        document.getElementById('btnDificuldade').textContent = 'hard';
    }else if(dificuldadeAtual == 'hard'){
        document.getElementById('btnDificuldade').textContent = 'insane';
    }else{
        document.getElementById('btnDificuldade').textContent = 'easy';
    }
    
}
function iniciarPartida(){

    dificuldadeAtual = document.getElementById('btnDificuldade').textContent;
    document.getElementById('creditos').style.display = 'none';
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('btnStart').style.display = 'none';
    document.getElementById('btnDificuldade').style.display = 'none';

    //ATIVANDO INTERFACE DA PARTIDA
    document.getElementById('container-partida').style.visibility = 'inherit';
    document.getElementById('areaMorcegos').style.zIndex = '3';
    temporizador();
    //pega dificuldade
}

function temporizador(){
    var minutos = 60;
    var velocidadeMorcego;

    switch(dificuldadeAtual){
        case 'easy':
            velocidadeMorcego = 1300;
        break;
        case 'hard':
            velocidadeMorcego = 1000;
        break;

        case 'insane':
            velocidadeMorcego = 680;
        break;
    }


    var tempo = setInterval(function(){
        minutos--;
        if(minutos == 0){
            clearInterval(tempo);
        }
        if(minutos < 10){
            document.getElementById('temporizador').style.marginLeft = '45%';
        }

        morcegos();
        document.getElementById('temporizador').textContent = minutos;
       
        if(nVidas != 0 && minutos == 0){
            location.replace("vitoria.html");
        }

    }, velocidadeMorcego ); 
}

function morcegos(){
   
    var audio1 = document.querySelector(`audio[data-key = "slap"]`);
    var audioVida = document.querySelector(`audio[data-key = "life"]`);

    audio1.volume = 0.3;
   
    audioVida.volume = 0.4;
      //remover morcego a cada 1s
      if( document.getElementById('morcego') ){
        document.getElementById('morcego').remove();
      
        nVidas--;      
        if(nVidas == 2){
            audioVida.currentTime = 0;
            audioVida.play();
            document.getElementById('barraVida').src = 'Imagens/vidaMetade.png';
        }else if(nVidas == 1){  
            audioVida.currentTime = 0;
            audioVida.play();
            document.getElementById('barraVida').src = 'Imagens/vidaVazia.png';
        }else{
            audioVida.currentTime = 0;
            audioVida.play();
            setTimeout(function(){
                location.replace("derrota.html");
            }, 1000);
            
        }
        audioVida.paused;    
    }

    var posicaoX = Math.abs(Math.floor(Math.random() * largura));
    var posicaoY = Math.abs(Math.floor(Math.random() * altura));
    var morcego = document.createElement('img');
    //configurando atirbutos
    morcego.src = 'Imagens/morcego.png';
    morcego.className = tamanhoAleatorio();
    morcego.id = 'morcego';
    morcego.style.left = posicaoX + 'px';
    morcego.style.top = posicaoY + 'px';
    morcego.style.position = 'absolute';
    morcego.style.scale = Math.random() + 'px';
    morcego.style.cursor = 'pointer';

    morcego.onclick = function(){
        audio1.currentTime = 0;
        audio1.play();
        this.remove();
    }
    morcego.ondragstart = function(){ //bloqueia arrastar o morcego com o mouse
        return false;
    }

    //adicionando ao documento
    document.getElementById('areaMorcegos').appendChild(morcego);
}

function tamanhoAleatorio(){
    //escolhe randomicamente qual classe será aplicada no morcego
    var classe = Math.floor(Math.random() * 4);
    switch(classe){
        case 0:
            return 'morcego1';
        case 1:
            return 'morcego2';
        case 2:
            return 'morcego3';
        case 3:
            return 'morcego4';
    }
}


    


