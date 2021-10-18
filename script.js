const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;



function handleKeyUp(event) {
    if (event.key == " ") {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            //subindo
            position += 20
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = window.screen.width;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = window.screen.width + 'px'
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition <= -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //GAMEOVER

            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">FIM DE JOGO</h1><h2 class="game-over">Pressione ESPAÇO para começar novamente</h2>';
            
            document.addEventListener('keypress', function (event) {
                if (event.key == ' ')
                    document.location.reload(true);
            });
                
            
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keypress', handleKeyUp)