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
        document.getElementById('btnDificuldade').textContent = 'Insane';
    }else{
        document.getElementById('btnDificuldade').textContent = 'easy';
    }
    
}
function iniciarPartida(){
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('btnStart').style.display = 'none';
    document.getElementById('btnDificuldade').style.display = 'none';

    //ATIVANDO INTERFACE DA PARTIDA
    document.getElementById('container-partida').style.visibility = 'inherit';
    document.getElementById('areaMorcegos').style.zIndex = '3';
    temporizador();
}

function temporizador(){
    var minutos = 60;
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

    }, 1000 ); 
}

function morcegos(){

      //remover morcego a cada 1s
      if( document.getElementById('morcego') ){
        document.getElementById('morcego').remove();
        nVidas--;      
        if(nVidas == 2){
            document.getElementById('barraVida').src = 'Imagens/vidaMetade.png';
        }else if(nVidas == 1){
            document.getElementById('barraVida').src = 'Imagens/vidaVazia.png';
        }else{
            setTimeout(function(){
                location.replace("derrota.html");
            }, 1500);
            
        }    
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


    


