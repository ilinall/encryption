const buttonEncrypt = document.querySelector('#encrypt');
const buttonDecrypt = document.querySelector('#decrypt');
const buttonHack = document.querySelector('#hacking');
const key = document.querySelector('#key');

const listLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let newText = '';

// Шифрование
buttonEncrypt.addEventListener('click', () => {
    const textarea = document.querySelector('#text');
    const keyValue = Number(key.value);
    newText = '';

    for (let letter of textarea.value) {
        const isUpperCase = letter === letter.toUpperCase();
        letter = letter.toLowerCase();
        if (letter === ' ') {
            newText += ' ';
            continue;
        }
        if (!listLetters.includes(letter)) {
            continue;
        }
        const indexLetter = listLetters.findIndex((item) => item === letter);
        let indexNewLetter = indexLetter + keyValue;

        if (indexNewLetter > 25) {
            indexNewLetter -= 26;
        }

        newText += isUpperCase ? listLetters[indexNewLetter].toUpperCase() : listLetters[indexNewLetter];
    }
    textarea.value = newText;
});

// Дешифровка
buttonDecrypt.addEventListener('click', () => {
    const textarea = document.querySelector('#text');
    const keyValue = Number(key.value);
    newText = '';

    for (const letter of textarea.value) {
        isUpperCase = letter === letter.toUpperCase();
        if (letter === ' ') {
            newText += ' ';
            continue;
        }
        if (!listLetters.includes(letter.toLowerCase())) {
            continue;
        }

        const indexLetter = listLetters.findIndex((item) => item === letter.toLowerCase());
        let indexNewLetter = indexLetter - keyValue;
        if (indexNewLetter < 0) {
            indexNewLetter += 26;
        }

        newText += isUpperCase ? listLetters[indexNewLetter].toUpperCase() : listLetters[indexNewLetter];
    }
    textarea.value = newText;
});

// Взлом
buttonHack.addEventListener('click', () => {
    const textarea = document.querySelector('#text');
    const text = textarea.value;
    const frequency = {};

    // Подсчет частоты букв
    for (const letter of text) {
        const lowerLetter = letter.toLowerCase();
        if (listLetters.includes(lowerLetter)) {
            frequency[lowerLetter] = (frequency[lowerLetter] || 0) + 1;
        }
    }
    // Находим наиболее частую букву
    const sortedLetters = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const mostFrequentLetter = sortedLetters[0] ? sortedLetters[0][0] : null;

    // Предполагаем, что наиболее частая буква соответствует 'e' (в английском языке)
    if (mostFrequentLetter) {
        const assumedShift = (listLetters.indexOf(mostFrequentLetter) - listLetters.indexOf('e') + 26) % 26;
        alert(`Предполагаемый сдвиг: ${assumedShift}`); 
        newText = '';
        for (const letter of text) {
            const isUpperCase = letter === letter.toUpperCase(); 
            if (!listLetters.includes(letter.toLowerCase())) {
                newText += letter; 
                continue;
            }
            const indexLetter = listLetters.findIndex((item) => item === letter.toLowerCase());
            let indexNewLetter = indexLetter - assumedShift;

            if (indexNewLetter < 0) {
                indexNewLetter += 26;
            }
            newText += isUpperCase ? listLetters[indexNewLetter].toUpperCase() : listLetters[indexNewLetter];
        }
        textarea.value = newText;
    }
});
