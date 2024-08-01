const reels = document.querySelectorAll('.reel');
const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');

let tg = window.Telegram.WebApp;

// Инициализация приложения
tg.expand();

// Основная тема приложения (светлая или темная)
document.body.className = tg.colorScheme;

function spinReel(reel) {
    const symbols = Array.from({length: 13}, (_, i) => `images/symbol${i + 1}.jpg`);
    const reelInner = reel.querySelector('.reel-inner');
    
    let html = '';
    for (let i = 0; i < 30; i++) { // Увеличим количество символов для более длинной анимации
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        html += `<div class="symbol"><img src="${symbol}" alt="Symbol"></div>`;
    }
    reelInner.innerHTML = html;
    
    const symbolHeight = 90; // Соответствует высоте .reel в CSS
    const totalSpins = 2 + Math.random() * 2; // От 2 до 4 полных оборотов
    const extraSpins = Math.floor(Math.random() * symbols.length);
    const finalPosition = -(symbolHeight * (totalSpins * symbols.length + extraSpins));
    
    reelInner.style.transition = 'none';
    reelInner.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        reelInner.style.transition = 'transform 4s cubic-bezier(.17,.67,.83,.67)';
        reelInner.style.transform = `translateY(${finalPosition}px)`;
    }, 50);

    return symbols[extraSpins];
}

spinButton.addEventListener('click', () => {
    resultDisplay.textContent = '';
    spinButton.disabled = true;
    
    const results = [];
    reels.forEach((reel, index) => {
        setTimeout(() => {
            const result = spinReel(reel);
            results.push(result);
            
            if (index === reels.length - 1) {
                setTimeout(checkWin, 4000, results); // Увеличим время до проверки выигрыша
            }
        }, index * 200); // Небольшая задержка между запуском барабанов
    });
});

function checkWin(results) {
    let message;
    if (results[0] === results[1] && results[1] === results[2]) {
        message = "Поздравляю, вы ПИДОРАС!";
        resultDisplay.style.color = 'green';
    } else {
        message = "АНЛАК";
        resultDisplay.style.color = 'red';
    }
    resultDisplay.textContent = message;
    
    spinButton.disabled = false;
}