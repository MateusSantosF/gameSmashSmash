var altura = 0;
var largura = 0;
var dificuldadeAtual;
var nVidas = 2;

function pegaTamanho(){
    altura = window.innerHeight - 200 ;
    largura = window.innerWidth - 200;    
}

function mudaDificuldade(){

    dificuldadeAtual = document.getElementById('btnDificuldade').textContent;

    if( dificuldadeAtual == 'Fácil'){
        document.getElementById('btnDificuldade').textContent = 'Difícil';
    }else if(dificuldadeAtual == 'Difícil'){
        document.getElementById('btnDificuldade').textContent = 'Insano';
    }else{
        document.getElementById('btnDificuldade').textContent = 'Fácil';
    }
    
}
function iniciarPartida(){
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('btnStart').style.display = 'none';
    document.getElementById('btnDificuldade').style.display = 'none';

    //ATIVANDO INTERFACE DA PARTIDA
    document.getElementById('container-partida').style.visibility = 'inherit';
    document.getElementById('areaVagalumes').style.zIndex = '3';
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

        vagalumes();
        document.getElementById('temporizador').textContent = minutos;
       
        if(nVidas != 0 && minutos == 0){
            location.replace("vitoria.html");
        }

    }, 1000 ); 
}

function vagalumes(){

      //remover vagalume a cada 1s
      if( document.getElementById('vagalume') ){
        document.getElementById('vagalume').remove();
        nVidas--;      
        if(nVidas == 1){
            document.getElementById('barraVida').src = 'Imagens/vidaMetade.png';
        }else{
            document.getElementById('barraVida').src = 'Imagens/vidaVazia.png';
            setTimeout(function(){
                location.replace("derrota.html");
            }, 1500);
            
        }    
    }

    var posicaoX = Math.abs(Math.floor(Math.random() * largura));
    var posicaoY = Math.abs(Math.floor(Math.random() * altura));
    var vagalume = document.createElement('img');
    //configurando atirbutos
    vagalume.src = 'Imagens/vagalume.png';
    vagalume.className = tamanhoAleatorio();
    vagalume.id = 'vagalume';
    vagalume.style.left = posicaoX + 'px';
    vagalume.style.top = posicaoY + 'px';
    vagalume.style.position = 'absolute';
    vagalume.style.scale = Math.random() + 'px';
    vagalume.style.cursor = 'pointer';

    vagalume.onclick = function(){
        this.remove();
    }
    vagalume.ondragstart = function(){ //bloqueia arrastar o vagalume com o mouse
        return false;
    }

    //adicionando ao documento
    document.getElementById('areaVagalumes').appendChild(vagalume);
}

function tamanhoAleatorio(){
    //escolhe randomicamente qual classe será aplicada no vagalume
    var classe = Math.floor(Math.random() * 4);
    switch(classe){
        case 0:
            return 'vagalume1';
        case 1:
            return 'vagalume2';
        case 2:
            return 'vagalume3';
        case 3:
            return 'vagalume4';
    }
}


    


