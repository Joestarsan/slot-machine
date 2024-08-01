const reels = document.querySelectorAll('.reel');
const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');

let tg = window.Telegram.WebApp;

tg.expand();
document.body.className = tg.colorScheme;

function initializeReels() {
    reels.forEach(reel => {
        const symbols = Array.from({length: 13}, (_, i) => `images/symbol${i + 1}.jpg`);
        const reelInner = reel.querySelector('.reel-inner');
        
        let html = '';
        for (let i = 0; i < 30; i++) { // Возвращаем 30 символов для "бесконечной" ленты
            const symbol = symbols[i % symbols.length];
            html += `<div class="symbol"><img src="${symbol}" alt="Symbol ${i+1}"></div>`;
        }
        reelInner.innerHTML = html;
    });
}

function spinReels() {
    return new Promise(resolve => {
        reels.forEach((reel, index) => {
            const reelInner = reel.querySelector('.reel-inner');
            const symbolHeight = 100; // Высота одного символа
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

            // Сброс позиции, когда достигнут конец ленты
            reelInner.addEventListener('transitionend', function resetPosition() {
                reelInner.style.transition = 'none';
                reelInner.style.transform = `translateY(${targetOffset % (symbolHeight * (totalSymbols / 3))}px)`;
                reelInner.removeEventListener('transitionend', resetPosition);
            });
        });

        setTimeout(resolve, 7000);
    });
}

spinButton.addEventListener('click', async () => {
    resultDisplay.textContent = '';
    spinButton.disabled = true;
    
    await spinReels();
    
    checkWin();
    spinButton.disabled = false;
});

function checkWin() {
    const visibleSymbols = Array.from(reels).map(reel => {
        const reelInner = reel.querySelector('.reel-inner');
        const offset = Math.abs(parseInt(reelInner.style.transform.replace('translateY(', '').replace('px)', '')));
        const visibleIndex = Math.floor(offset / 100) % 13; // 13 - количество уникальных символов
        return `images/symbol${visibleIndex + 1}.jpg`;
    });

    let message;
    if (visibleSymbols[0] === visibleSymbols[1] && visibleSymbols[1] === visibleSymbols[2]) {
        message = "Поздравляю, вы ПИДОРАС!";
        resultDisplay.style.color = 'green';
    } else {
        message = "АНЛАК";
        resultDisplay.style.color = 'red';
    }
    resultDisplay.textContent = message;
}

window.addEventListener('load', initializeReels);