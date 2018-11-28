/*
 * Create a list that holds all of your cards
 */
let cardList = Array.from(document.querySelectorAll(".deck li"));
let myNode = document.querySelector(".deck");
let cardsArray = [];
let movesMade = 0;
let timerOff = true;
let timeTracker = 0;
let timerId;
let matchedCards = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML*
 *   - add each card's HTML to the page
 */
function shuffleCards() {
  let shuffledDeck = shuffle(cardList);
  for (shuffledCard of shuffledDeck) {
    myNode.appendChild(shuffledCard);
  }
}

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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 */
function changeClass(clickedCard) {
  clickedCard.classList.toggle("open");
  clickedCard.classList.toggle("show");
}
myNode.addEventListener("click", event => {
  let clickedCard = event.target;
  if (
    clickedCard.classList.contains("card") &&
    !clickedCard.classList.contains("match") &&
    cardsArray.length < 2 &&
    !cardsArray.includes(clickedCard)
  ) {
    if (timerOff) {
      startTimer();
      timerOff = false;
    }
    // Recursive
    changeClass(clickedCard);
    // Open cards
    addToCardsArray(clickedCard);
    if (cardsArray.length === 2) {
      countMoves();
      matchCheck(clickedCard);
    }
  }
});

/*  - add the card to a *list* of "open" cards */
function addToCardsArray(clickedCard) {
  cardsArray.push(clickedCard);
}
/*  - if the list already has another card, check to see if the two cards match */
function matchCheck() {
  if (
    cardsArray[0].firstElementChild.className ===
    cardsArray[1].firstElementChild.className
  ) {
    cardsArray[0].classList.toggle("match");
    cardsArray[1].classList.toggle("match");
    matchedCards++;
    cardsArray = [];

    const totalMatched = 8;
    if (matchedCards === totalMatched) {
      gameWon();
    }
  } else {
    setTimeout(() => {
      changeClass(cardsArray[0]);
      changeClass(cardsArray[1]);
      cardsArray = [];
    }, 500);
  }
}
/*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)*/
function countMoves() {
  movesMade++;
  let movesData = document.querySelector(".moves");
  movesData.innerHTML = movesMade;
  removeStar();
}

function removeStar() {
  let star = document.querySelector(".stars");
  let stars = document.querySelectorAll(".stars li");
  if (movesMade === 12) {
    star.removeChild(stars[0]);
  } else if (movesMade === 20) {
    star.removeChild(stars[1]);
  }
}

function startTimer() {
  timerId = setInterval(() => {
    timeTracker++;
    showTime();
  }, 1000);
}

function showTime() {
  let timer = document.querySelector(".timer");
  let minutes = Math.floor(timeTracker / 60);
  let seconds = timeTracker % 60;
  if (seconds < 10) {
    timer.innerHTML = `${minutes}:0${seconds}`;
  } else {
    timer.innerHTML = `${minutes}:${seconds}`;
  }
  dataToModal();
}

function stopTimer() {
  clearInterval(timerId);
}

function resetBoard() {
  matchedCards = 0;
  resetTimerAndTracker();
  resetRating();
  resetMoves();
  shuffleCards();
  resetCards();
}
function resetTimerAndTracker() {
  stopTimer();
  timerOff = true;
  timeTracker = 0;
  showTime();
}
function resetMoves() {
  movesMade = 0;
  document.querySelector(".moves").innerHTML = movesMade;
}
function resetRating() {
  if (movesMade < 12) {
    document.getElementById("star").innerHTML;
  } else if (movesMade < 20 && movesMade >= 12) {
    document.getElementById("star").innerHTML += `<i class ="fa fa-star">`;
  } else if (movesMade >= 20) {
    document.getElementById(
      "star"
    ).innerHTML += `<i class ="fa fa-star"><i class ="fa fa-star">`;
  }
}
/*    + if all cards have matched, display a message with the final score
 */ function gameWon() {
  stopTimer();
  $("#exampleModal").modal("show");
  dataToModal();
}
/* Writing Data to Modal*/
function dataToModal() {
  let timeLapsed = document.querySelector("#timeLapsed");
  let starsEarned = document.querySelector("#starsEarned");
  let stars = "";
  [].forEach.call(document.querySelectorAll(".stars li"), function(item) {
    return (stars += item.innerHTML);
  });

  let turnsTaken = document.querySelector("#turnsTaken");
  timeLapsed.innerHTML = `Time:${document.querySelector(".timer").innerHTML}`;
  starsEarned.innerHTML = `Stars:${stars}`;
  turnsTaken.innerHTML = `Moves:${document.querySelector(".moves").innerHTML}`;
}
function resetCards() {
  var cards = document.querySelectorAll(".deck li");
  for (card of cards) {
    card.classList = "card";
  }
}
document.getElementById("Play").addEventListener("click", () => {
  //console.log("Entered into Play again functionality");
  resetBoard();
  $("#exampleModal").modal("hide");
});
document.querySelector(".restart").addEventListener("click", resetBoard);
