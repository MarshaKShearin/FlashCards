//DOM selectors
const cardsContainer = document.getElementById('cards-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const currentElement = document.getElementById('current');
const showButton = document.getElementById('show');
const hideButton = document.getElementById('hide');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const addCardButton = document.getElementById('add-card');
const clearButton = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//variable that tracks current card
let currentActiveCard = 0;

//stores DOM cards
const cardsElement = [];

//Store card data
const cardsData = getCardsData();


//stores card data
// const cardsData = [
// {   
//     question:'How many licks does it take to get to the center of a tootsie pop?', 
//     answer:'1, 2, 3!  3!'
// },
// {   question:'', 
//     answer:''
// },
// {   question:'', 
//     answer:''
// }
// ];

//function to create cards
function createCards(){
    cardsData.forEach((data,index) => createCard(data, index));
}

//function to create single card in DOM
function createCard(data, index){
    const card = document.createElement ('div');
    card.classList.add('card');

    if (index === 0){
        card.classList.add('active');
    }

    card.innerHTML = `            
        <div class="inner-card">
            <div class="inner-card-front">
                <p> ${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p> ${data.answer}</p>
            </div>
        </div>
        `;

        //add click event to flip the card
        card.addEventListener('click', () => card.classList.toggle('show-answer'));

    //Add to DOM cards
    cardsElement.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

//show number of cards
function updateCurrentText(){
    currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`;
}
// Get cards from local storage
function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}
//Add cards to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();


//Event Listeners
//Next Button
nextButton.addEventListener('click', () => {
    cardsElement[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if(currentActiveCard > cardsElement.length - 1) {
        currentActiveCard = cardsElement.length -1;
    }

    cardsElement[currentActiveCard].className = 'card active';

    updateCurrentText();
});
//Previous Button
prevButton.addEventListener('click', () => {
    cardsElement[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsElement[currentActiveCard].className = 'card active';

    updateCurrentText();
});

//Show add container
showButton.addEventListener('click', () => addContainer.classList.add('show'));

//Hide add container
hideButton.addEventListener('click', () => addContainer.classList.remove('show'));

//Add New Card
addCardButton.addEventListener('click', () => {
    const question = questionElement.value;
    const answer = answerElement.value;
    
    if(question.trim() && answer.trim()){
        const newCard = { question, answer }
        createCards(newCard);

        questionElement.value = '';
        answerElement.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
})

//clear deck
clearButton.addEventListener('click',() => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});

