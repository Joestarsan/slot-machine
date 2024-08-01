const reels = document.querySelectorAll('.reel');
const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');

function spinReel(reel) {
    // Изменено расширение с .png на .jpg
    const symbols = Array.from({length: 13}, (_, i) => `images/symbol${i + 1}.jpg`);
    const reelInner = reel.querySelector('.reel-inner');
    
    let html = '';
    for (let i = 0; i < 20; i++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        html += `<div class="symbol"><img src="${symbol}" alt="Symbol"></div>`;
    }
    reelInner.innerHTML = html;
    
    const symbolHeight = 100;
    const randomOffset = Math.floor(Math.random() * (symbols.length - 3)) + 3;
    reelInner.style.transform = `translateY(-${symbolHeight * randomOffset}px)`;

    return symbols[randomOffset % symbols.length];
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
                setTimeout(checkWin, 3000, results);
            }
        }, index * 500);
    });
});

function checkWin(results) {
    if (results[0] === results[1] && results[1] === results[2]) {
        resultDisplay.textContent = "Поздравляю, вы Гном Чата!";
        resultDisplay.style.color = 'green';
    } else {
        resultDisplay.textContent = "Попробуйте еще раз!";
        resultDisplay.style.color = 'red';
    }
    spinButton.disabled = false;
}