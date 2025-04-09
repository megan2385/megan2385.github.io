const newQuoteButton = document.querySelector('#js-new-quote');

newQuoteButton.addEventListener('click', getQuote);

function getQuote() {
    console.log("Button clicked!");
    const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            displayQuote(data.question); 
        })
        .catch(error => {
            console.error('Fetch error:', error); 
            alert("Sorry, something went wrong. Please try again later.");
        });
}

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}


getQuote();
