/*
 * Create a list that holds all of your cards
 */
let cardList = document.querySelectorAll(".card");
let myNode = document.querySelector(".deck");

let cardArray = [],
  leaf;
function arrayReturn() {
  for (let i = 0; i < cardList.length; i++) {
    leaf = cardList[i].outerHTML.trim();
    cardArray.push(leaf);
  }
  return cardArray;
}
arrayReturn();
console.log(cardArray);
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
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
shuffle(cardArray);
document.write(cardArray[3]);

function createUi() {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}
createUi();
console.log(myNode);
console.log(Array.isArray(cardArray));
cardArray.map(function() {
  if (myNode) {
    myNode.innerHTML = cardArray.join(" ");
  }
  return myNode;
});
console.log(`My Node second console ${myNode.innerHTML}`);

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*/
function respondToTheClick() {
  console.log("A paragraph was clicked.");
  // cards[i].classList.remove("show","open","match","disabled")
}

myNode.addEventListener("click", respondToTheClick);
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
