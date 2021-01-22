const dinito = document.querySelector('.dinito');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event){
    if (event.code === "ArrowUp") {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval (() => {
        if (position >= 150) {
            clearInterval(upInterval);
             //descendo
             let downInterval = setInterval(() => {
                 if (position <= 0) {
                     clearInterval(downInterval);
                     isJumping = false;
                 }
                 else {
                 position -= 20;
                 dinito.style.bottom = position + 'px';
                 }
             }, 20);
        }
        else {
        //subindo
        position += 20;
        dinito.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 7000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);    

    let leftTimer = setInterval(() => {
        if (cactusPosition < -70) {
            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 70 && position < 70) {
        //Game Over
        clearInterval(leftTimer);
        isGameOver = true;
        document.body.innerHTML = '<h1 class="game-over">Fim De Jogo</h1>';
        }
        else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup' , handleKeyUp);