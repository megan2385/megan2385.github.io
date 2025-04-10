const newQuoteButton = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');
let currentCard = null;

newQuoteButton.addEventListener('click', getQuote);
answerButton.addEventListener('click', showAnswer);

function getQuote() {
    console.log("Fetching a new card...");
    const endpoint = 'https://tarotapi.dev/api/v1/cards/random';
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            currentCard = data.cards[0];
            displayQuote(`${currentCard.name}: ${currentCard.desc}`);
            clearAnswer();
            displayCardImage(currentCard); // 👈 Show image
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert("Sorry, something went wrong. Please try again later.");
        });
}

function displayQuote(text) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = text;
}

function clearAnswer() {
    document.querySelector('#js-answer-text').textContent = '';
}

function showAnswer() {
    const answerText = document.querySelector('#js-answer-text');
    if (!currentCard) {
        answerText.textContent = "Please generate a card first!";
        return;
    }

    const isUpright = Math.random() < 0.5;
    const meaning = isUpright ? currentCard.meaning_up : currentCard.meaning_rev;
    const orientation = isUpright ? 'Upright' : 'Reversed';
    answerText.textContent = `${orientation} meaning: ${meaning}`;
}

function displayCardImage(card) {
    let imageContainer = document.querySelector('#js-card-image');

    if (!imageContainer) {
        imageContainer = document.createElement('div');
        imageContainer.id = 'js-card-image';
        imageContainer.style.textAlign = 'center';
        imageContainer.style.padding = '10px';
        document.querySelector('.quotes').appendChild(imageContainer);
    }

    const imgUrl = getCardImageUrl(card);
    if (imgUrl) {
        imageContainer.innerHTML = `<img src="${imgUrl}" alt="${card.name}" style="max-height: 300px;">`;
    } else {
        imageContainer.innerHTML = ''; // Clear if image not found
    }
}

function getCardImageUrl(card) {
    const base = "https://upload.wikimedia.org/wikipedia/commons/thumb";

    if (card.type === "major") {
        // Build URL using card name, e.g., "The Fool" → "00_The_Fool"
        const majorMap = {
            "The Fool": "00_The_Fool",
            "The Magician": "01_The_Magician",
            "The High Priestess": "02_The_High_Priestess",
            "The Empress": "03_The_Empress",
            "The Emperor": "04_The_Emperor",
            "The Hierophant": "05_The_Hierophant",
            "The Lovers": "06_The_Lovers",
            "The Chariot": "07_The_Chariot",
            "Strength": "08_Strength",
            "The Hermit": "09_The_Hermit",
            "Wheel of Fortune": "10_Wheel_of_Fortune",
            "Justice": "11_Justice",
            "The Hanged Man": "12_The_Hanged_Man",
            "Death": "13_Death",
            "Temperance": "14_Temperance",
            "The Devil": "15_The_Devil",
            "The Tower": "16_The_Tower",
            "The Star": "17_The_Star",
            "The Moon": "18_The_Moon",
            "The Sun": "19_The_Sun",
            "Judgement": "20_Judgement",
            "The World": "21_The_World"
        };
        const fileName = majorMap[card.name];
        return fileName
            ? `${base}/d/dd/RWS_Tarot_${fileName}.jpg/300px-RWS_Tarot_${fileName}.jpg`
            : '';
    } else {
        // Minor arcana: build file name from name_short (e.g. "5_of_cups")
        const suitMap = {
            wands: "Wands",
            cups: "Cups",
            swords: "Swords",
            pentacles: "Pentacles"
        };

        const [value, suit] = card.name_short.split('_');
        const suitName = suitMap[suit];
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);

        return suitName
            ? `${base}/1/11/RWS_Tarot_${capitalized}_of_${suitName}.jpg/300px-RWS_Tarot_${capitalized}_of_${suitName}.jpg`
            : '';
    }
}


getQuote();