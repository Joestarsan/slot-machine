const reels = document.querySelectorAll('.reel');
const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');

let tg = window.Telegram.WebApp;

tg.expand();
document.body.className = tg.colorScheme;

function initializeReels() {
    reels.forEach(reel => {
        const symbols = Array.from({length: 14}, (_, i) => `images/symbol${i + 1}.jpg`);
        const reelInner = reel.querySelector('.reel-inner');
        
        let html = '';
        for (let i = 0; i < 30; i++) {
            const symbol = symbols[i % symbols.length];
            html += `<div class="symbol"><img src="${symbol}" alt="Symbol ${i+1}"></div>`;
        }
        reelInner.innerHTML = html;
    });
}

function spinReels() {
    return new Promise(resolve => {
        let results = [];
        reels.forEach((reel, index) => {
            const reelInner = reel.querySelector('.reel-inner');
            const symbolHeight = 100;
            const totalSymbols = reelInner.children.length;
            const spinDuration = 5 + index;
            
            const initialOffset = parseInt(reelInner.style.transform.replace('translateY(', '').replace('px)', '') || '0');
            const targetOffset = initialOffset - (Math.floor(Math.random() * 10 + 20) * symbolHeight);
            
            reelInner.style.transition = 'none';
            reelInner.style.transform = `translateY(${initialOffset}px)`;

            setTimeout(() => {
                reelInner.style.transition = `transform ${spinDuration}s cubic-bezier(.5, 0, .5, 1)`;
                reelInner.style.transform = `translateY(${targetOffset}px)`;
            }, 50);

            reelInner.addEventListener('transitionend', function resetPosition() {
                const finalPosition = targetOffset % (symbolHeight * 14);
                reelInner.style.transition = 'none';
                reelInner.style.transform = `translateY(${finalPosition}px)`;
                reelInner.removeEventListener('transitionend', resetPosition);

                const resultIndex = (Math.abs(finalPosition / symbolHeight)) % 14;
                results.push(resultIndex);

                if (results.length === reels.length) {
                    resolve(results);
                }
            });
        });
    });
}

spinButton.addEventListener('click', async () => {
    resultDisplay.textContent = '';
    spinButton.disabled = true;
    
    const results = await spinReels();
    
    checkWin(results);
    spinButton.disabled = false;
});

function checkWin(results) {
    console.log("Visible symbols:", results); // Для отладки

    let message;
    if (results[0] === results[1] && results[1] === results[2]) {
        message = "Поздравляю, вы ПИДОРАС!";
        resultDisplay.style.color = 'green';
    } else {
        message = "АНЛАК";
        resultDisplay.style.color = 'red';
    }
    resultDisplay.textContent = message;
}

window.addEventListener('load', initializeReels);
