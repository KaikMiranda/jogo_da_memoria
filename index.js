const tabuleiro = document.getElementById("tabuleiro");
const reset = document.getElementById("reset");

reset.addEventListener("click", function(){
    tabuleiro.innerHTML = "";
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;

    criarCartas();
})

let primeiraCarta;
let segundaCarta;
let bloqueado = false;

const personagem = [
    "cartas/meliodas-removebg-preview.png",
    "cartas/ban-removebg-preview.png",
    "cartas/diane-removebg-preview.png",
    "cartas/Escanor-removebg-preview.png",
    "cartas/extra-removebg-preview.png",
    "cartas/gatherw-removebg-preview.png",
    "cartas/king-removebg-preview.png",
    "cartas/merlin-removebg-preview.png"
]
const cartasDoJogo = [...personagem, ...personagem]
console.log(cartasDoJogo.length)

console.log(cartasDoJogo)

tabuleiro.innerHTML = "";


function criarCartas(){
    
    for (let i = cartasDoJogo.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
    
        let temporaria = cartasDoJogo[i];
    
        cartasDoJogo[i] = cartasDoJogo[j];
        cartasDoJogo[j] = temporaria;
    }

    cartasDoJogo.forEach(function(carta){

        const botao = document.createElement("button")
        
        tabuleiro.appendChild(botao);
        
        const imagem = document.createElement("img");

        imagem.src = carta

        imagem.style.display = "none"

        botao.appendChild(imagem);
        
        
        
    })
    const cartas = tabuleiro.querySelectorAll("button");
    
    cartas.forEach(function(carta) {
        
        const imagem = carta.querySelector("img");
        
        if (imagem) {
            
            imagem.style.display = "none";
            
            carta.addEventListener("click", function() {
                
                if (bloqueado) {
                    return;
                }
    
                if (primeiraCarta === imagem) {
                    return;
                }
    
                imagem.style.display = "block";
                
                carta.style.transform = "rotateY(180deg)";
                
                if (primeiraCarta) {
                    
                    console.log("Já existe uma primeira carta!");
                    
                    segundaCarta = imagem;
                    bloqueado = true;
    
                    console.log(primeiraCarta.src === segundaCarta.src);
                    
                    if (primeiraCarta.src === segundaCarta.src) {
                        
                        console.log("Par encontrado");
    
                        primeiraCarta.parentElement.disabled = true;
                        segundaCarta.parentElement.disabled = true;
    
                        primeiraCarta = null;
                        segundaCarta = null;
                        bloqueado = false;
    
                    }else {
                        setTimeout(function(){
    
                            primeiraCarta.style.display = "none";
                            segundaCarta.style.display = "none";
    
                            primeiraCarta.parentElement.style.transform = "rotateY(0deg)";
                            segundaCarta.parentElement.style.transform = "rotateY(0deg)";

                            primeiraCarta = null;
                            segundaCarta = null;
                            bloqueado = false;
                        }, 500)
                    }
                } else {
    
                    primeiraCarta = imagem;
                }
            });
        }
    });
}

criarCartas();
