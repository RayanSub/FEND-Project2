/*
 * Create a list that holds all of your cards
 */

 let cardList = document.querySelectorAll(".card"); //get all the card elements
 let cardArray = Array.from(cardList); //make it an array
 let counter = 0;
 let seconds = 0
 let minutes = 0;
 let rate = "";

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

window.onload = start; //once the window is loaded run the start function

//the function updates the deck for a new game.
function start() {
    ArrayOpenCards.length = 0;
    cardArrayHolder = shuffle(cardArray);
    document.querySelector(".deck").innerHTML = "";
    let frag = document.createDocumentFragment();

    for(let i = 0; i < cardArrayHolder.length; i++){ //create li elements and add them the card class and append them to the fragment.
        test2 = cardArrayHolder[i];
        listItem = document.createElement("li");
        listItem.classList.add("card");             
        listItem.innerHTML = test2.innerHTML;
        frag.appendChild(listItem);
    }

    let deckCon = document.querySelector(".deck");
    deckCon.appendChild(frag); //append the fragment to the deck.
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


let ArrayOpenCards = [];

document.querySelector(".deck").addEventListener("click", flipTheCard);

//adds the required classes to make the cards flip if you click them.
function flipTheCard(event) {           
    if(event.target.nodeName === "LI"){
        event.target.classList.add("open");
        event.target.classList.add("show");
        event.target.classList.add("disable");
        OpenCardList(event.target);
    }
}



function OpenCardList() {

    if(ArrayOpenCards.length < 2){          //if the array is less than 2 add a card.
     ArrayOpenCards.push(event.target);   
    }

    if(ArrayOpenCards.length === 2){
        moveCounter(); //if you choose 2 cards adds 1 move.
        starRating();  //check if you should update the star rating or not.
        Winner();      //check if the game is finished or not.
        if(ArrayOpenCards[0].innerHTML === ArrayOpenCards[1].innerHTML){
            cardsMatched();
        }
        else{
            ArrayOpenCards[0].classList.add("notMatched"); //adds the notMatched class to make them red for a moment.
            ArrayOpenCards[1].classList.add("notMatched");
            disableCard();
            setTimeout(cardsNotMatched,1000); //give at least 1 second to flip the cards agian.
        }
    }
}

//if the cards match.
function cardsMatched() {
    ArrayOpenCards[0].classList.add("match"); //adding the match class.
    ArrayOpenCards[1].classList.add("match");
    ArrayOpenCards[0].classList.remove("open","show"); 
    ArrayOpenCards[1].classList.remove("open","show");
    ArrayOpenCards.length = 0;   //empty the array
}

//if the 2 cards doesnt match.
function cardsNotMatched() {
    ArrayOpenCards[0].classList.remove("open","show","disable","notMatched"); 
    ArrayOpenCards[1].classList.remove("open","show","disable","notMatched"); 
    enableCards();
    ArrayOpenCards.length = 0;   //empty the array
}

//disable cards for a moment so the players doesnt choose too many cards.
function disableCard() {
    let listOfCards = document.getElementsByClassName("card");
    let arrayOfCards = [...listOfCards];
    for(let i = 0; i < arrayOfCards.length; i++){
        arrayOfCards[i].classList.add("disable");
    }
}

//enable them agian.
function enableCards() {
    let listOfCards = document.getElementsByClassName("card");
    let arrayOfCards = [...listOfCards];
    for(let i = 0; i < arrayOfCards.length; i++){
        arrayOfCards[i].classList.remove("disable");
    }
}

//adds 1 to the move counter, and starts the timer if counter == 1.
function moveCounter() {
    counter++;
    document.querySelector(".moves").innerHTML = counter; //change the moves counter.
    if(counter === 1){
        timer();
    }
}

/*checks the number of moves to update the star rating 
  8 moves and below is three stars
  9 to 16 is two stars
  17 and above is 1 star.
*/
function starRating() {

    let m = counter;
    let star = document.getElementsByClassName("fa-star");
    let stars = [...star];

    if(m === 9){
        stars[2].classList.remove(".fa-star");
        stars[2].classList.add("fa-star-o");
    }

    if(m === 17){
        stars[1].classList.remove(".fa-star");
        stars[1].classList.add("fa-star-o");
    }
}

// document.querySelector(".fa-repeat").addEventListener("click", reset);
document.getElementsByClassName("fa-repeat")[0].addEventListener("click", reset);

//resets the game including the time rating and moves.
function reset() {
    counter = 0;
    seconds = 0;
    minutes = 0;
    document.querySelector(".timer").innerHTML = "Timer " + minutes + " : " + seconds;
    clearTimeout(myTimer);
    document.querySelector(".moves").innerHTML = counter;
    let star = document.getElementsByClassName("fa-star");
    let stars = [...star];
    for(let i = 0; i < stars.length; i++){
        stars[i].classList.remove("fa-star-o");
    }
    let win = document.querySelector(".winnerScreen");
    win.classList.add("remove"); //adds the remove class to the win screen to make it invisible.
    start();
}

//the timer function every 1 second updates the time to the board.
function timer() { 
    document.querySelector(".timer").innerHTML = "Timer " + minutes + " : " + seconds;
    seconds++;
    if(seconds > 59){
        seconds = 0;
        minutes++;
    }
    myTimer = setTimeout(timer,1000);  
}

//the method checks if all the cards are matched and displays a win screen.
function Winner() {
    let listOfCards = document.getElementsByClassName("card");
    let arrayOfCards = [...listOfCards];
    let count = 0;
    for(let i = 0; i < arrayOfCards.length; i++){
        if(arrayOfCards[i].classList.contains("match")){
            count++;
        }
    }
    if(count === 14){
        clearTimeout(myTimer); //stops the timer.
        let starNumber = countstars();
        let win = document.querySelector(".winnerScreen");
        let time = document.querySelector(".timer").innerHTML;
        let moves = document.querySelector(".moves").innerHTML;
        win.innerHTML = `congratulations!

        the ${time},
        
        the Rating is ${starNumber} stars,
        
        and the number of moves is ${moves},
        
        Play Again? `;

        let restartButton = document.createElement("i");
        restartButton.classList.add("fa", "fa-repeat");
        win.appendChild(restartButton); //adds the restartButton to the popup win screen.
        win.classList.remove("remove"); //make the win screen visible.
        document.getElementsByClassName("fa-repeat")[1].addEventListener("click", reset);
    }
}

//this method helps to count the stars for the winner function to add it to the win screen.
function countstars() {
    if(counter <= 8){
        return 3;
    }
    else if(counter <= 16){
        return 2;
    }
    else{
        return 1;
    }
}

