document.getElementById('spinButton').addEventListener('click', () => {
    const symbols = [
        'images/symbol1.jpg',
        'images/symbol2.jpg',
        'images/symbol3.jpg'
    ];

    console.log('Available symbols:', symbols); // Добавлено для отладки

    const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel3 = symbols[Math.floor(Math.random() * symbols.length)];

    console.log('Selected symbols:', reel1, reel2, reel3); // Добавлено для отладки

    document.getElementById('reel1').innerHTML = `<img src="${reel1}" alt="Reel">`;
    document.getElementById('reel2').innerHTML = `<img src="${reel2}" alt="Reel">`;
    document.getElementById('reel3').innerHTML = `<img src="${reel3}" alt="Reel">`;

    if (reel1 === reel2 && reel2 === reel3) {
        document.getElementById('resultMessage').textContent = 'Поздравляю, вы Гном Чата!';
    } else {
        document.getElementById('resultMessage').textContent = '';
    }
});
