/*
 * Create a list that holds all of your cards
 */
let cardList = Array.from(document.querySelectorAll(".deck li"));
let myNode = document.querySelector(".deck");
let movesMade=0;

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below*/
let shuffledDeck=shuffle(cardList);
//console.log(Array.isArray(shuffledDeck));

/*   - loop through each card and create its HTML*/
for(shuffledCard of shuffledDeck){
	myNode.appendChild(shuffledCard);
}
/*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// function createUi() {
  // while (myNode.firstChild) {
    // myNode.removeChild(myNode.firstChild);
  // }
// }
//createUi();
// console.log(myNode);
//console.log(Array.isArray(cardArray));
// cardArray.map(function() {
  // if (myNode) {
    // myNode.innerHTML = cardArray.join(" ");
  // }
  // return myNode;
// });
// console.log(`My Node second console ${myNode.innerHTML}`);

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*/
function changeClass(clickedCard){
		clickedCard.classList.toggle('open',);
		clickedCard.classList.toggle('show');
}
myNode.addEventListener('click',event=>{
	let clickedCard=event.target;
	if(clickedCard.classList.contains('card') && !clickedCard.classList.contains('match') && cardsArray.length<2 && !cardsArray.includes(clickedCard)){
		console.log("A card was clicked.");
		changeClass(clickedCard);
		addToCardsArray(clickedCard);
		if(cardsArray.length===2){
		matchCheck(clickedCard);
		countMoves();
		}
	}
// function respondToTheClick() {
  // console.log("A paragraph was clicked.");
  // cards[i].classList.remove("show","open","match","disabled")
});

//myNode.addEventListener("click", respondToTheClick);
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/

let cardsArray=[];
function addToCardsArray(clickedCard){
	cardsArray.push(clickedCard);
	console.log(cardsArray);
}

/*  - if the list already has another card, check to see if the two cards match */
function matchCheck(){
	if(cardsArray[0].firstElementChild.className===cardsArray[1].firstElementChild.className){
		cardsArray[0].classList.toggle('match');
		cardsArray[1].classList.toggle('match');
		cardsArray=[];
	}
	else{
		setTimeout(()=>{
		changeClass(cardsArray[0]);
		changeClass(cardsArray[1]);
		cardsArray=[];
		},500)
	}
}
/*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)*/
function countMoves(){
	movesMade++;
	let movesData=document.querySelector('.moves');
	movesData.innerHTML=movesMade;
	removeStar();
}

function removeStar(){
	let star=document.querySelector('.stars');
	let stars=document.querySelectorAll('.stars li');
		if(movesMade===12){	
		star.removeChild(stars[0]);	
		}
		if (movesMade===20){
			star.removeChild(stars[1]);
		}		
	}
/*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

