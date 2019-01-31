let cardClassesList = [ 'fa-diamond',
						'fa-paper-plane-o',
						'fa-anchor',
						'fa-bolt',
						'fa-cube',
						'fa-bomb',
						'fa-bicycle',						
						'fa-leaf',
					   ];

cardClassesList = cardClassesList.concat(cardClassesList);

// declare all the values in the game
let deck = document.querySelector('.deck');
let cardHTML;
let allCards;
let move = document.querySelector('.moves');
let openCards;
let moveCounter;
let finish;
let restartButtom = document.querySelector('.restart');
let rating = document.querySelector('.rating');
let timer = document.querySelector('.timer')
let clockOff;
let time;
let clockId;

/**
* @description Shuffle function from http://stackoverflow.com/a/2450976
* @param {array} array waited shuffle
* @returns {array} array shuffled
*/
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


/**
* @description generate cards
* @param {string} card class name
* @returns {string} HTML for every card 
*/
function generateCards(cardClassName) {
	return `<li class="card" data-card="${cardClassName}">
                <i class="fa ${cardClassName}"></i>
            </li>`
}

/**
* @description generate stars
* @param {int} stars number
*/
function generateStar(num) {
	let star = document.querySelector('.stars');
	let starHTML = '';
	for (let i = 0; i < num; i++) {
		starHTML = starHTML + '<li><i class="fa fa-star"></i></li>';
	}
	star.innerHTML = starHTML;
}

/**
* @description restart the game
* reset and shuffle the cards
* set the values to default
*/
function restartGame() {
	cardHTML = shuffle(cardClassesList).map((card) => {
		return generateCards(card);
	})
	deck.innerHTML = cardHTML.join('');
	allCards = document.querySelectorAll('.card');

	activeCards();

	openCards = [];
	moveCounter = 0;
	finish = 0;
	clockOff = true;
	time = 0;
	stopClock();
	allCards.forEach(function(card) {
		if (card.classList.contains('open')) {
			card.classList.remove('open');
		};
		if (card.classList.contains('match')) {
			card.classList.remove('match');
		};
		if (card.classList.contains('show')) {
			card.classList.remove('show');
		};
	})
	move.innerText = moveCounter;
	timer.innerText = '0:00';
	generateStar(3);
	rating.innerText = "Great";
}

/**
* @description start the clock
*/
function startClock() {
	clockId = setInterval(() => {
		time++;
		displayTime();
	}, 1000);
}

/**
* @description stop the clock
*/
function stopClock() {
	clearInterval(clockId);
}

/**
* @description display the time
*/
function displayTime() {
	let min = Math.floor(time / 60);
	let sec = time % 60;
	if (sec < 10) {
		timer.innerText = `${min}:0${sec}`;
	} else {
		timer.innerText = `${min}:${sec}`;
	}
}

/**
* @description check the click is valid or not
* @param {element} the element which is been clicked
* @returns {boolean} vaild is true
*/
function isClickValid(clickTarget) {
	return (clickTarget.classList.contains('card') &&
		!clickTarget.classList.contains('match'));
}

/**
* @description set two cards to be matched
* @param {array} array contains two card element
* @returns {array} empty array
*/
function setMatch(openCards) {
	openCards[0].classList.add('match');
	openCards[1].classList.add('match');
	return [];
}

/**
* @description every move display the card
* @param {element} card element which is been selected
* display the card the user clicked
* change the move and give the rating
*/
function singleMove(card) {
	card.classList.add('open', 'show');
	moveCounter++;
	move.innerText = moveCounter;
	if (moveCounter <= 12) {
		rating.innerText = "Great";
		generateStar(3);
	} else {
		if (moveCounter > 25) {
			rating.innerText = "Poor";
			generateStar(1);
		} else {
			rating.innerText = "Average";
			generateStar(2);
		}
	};
}

/**
* @description hide the cards
* @param {array} array with all the open cards
* @param {function} callback function 
*/
function hide(openCards, callback) {
	return function() {
		openCards.forEach(function(openCard) {
			openCard.classList.remove('open', 'show');
		});
		callback();
	}
}

/**
* @description the game is finished
* show the modal
*/
function finished() {
	stopClock();
	toggleModel();
}

/**
* @description capture states and output the result
* toggle the modal
*/
function toggleModel() {
	writeModalStats();
	let modal = document.querySelector('.modal__background');
	modal.classList.toggle('hide');
}

/**
* @description output the stats and show on the modal
*/
function writeModalStats() {
	let timeStat = document.querySelector('.modal__time');
	let moveStat = document.querySelector('.modal__moves');
	let ratingStat = document.querySelector('.modal__rating');
	timeStat.innerHTML = `Time = ${timer.innerText}`;
	moveStat.innerHTML = `Moves = ${moveCounter}`;
	ratingStat.innerHTML = `Rating = ${rating.innerText}`;
}

/**
* @description set eventlistener on every card
*/
function activeCards() {
	allCards.forEach(function(card) {
		card.addEventListener('click', e => {
			/* check if the card is opened
			* if not add the card to opencard list 
			* else do nothing
			*/
			if (!card.classList.contains('open') && !card.classList.contains('show')) {
				openCards.push(card);
				/* if opened card is equal to 2, display the card and check for match  
				* if opened card is less than 2, display the card 
				* if opened card is more than 2, that click is invalid, pop the card
				*/
				if (openCards.length <= 2) {
					if (openCards.length == 2) {
						singleMove(card);
						// check if match
						if (openCards[0].dataset.card == openCards[1].dataset.card) {
							openCards = setMatch(openCards);
							finish += 2;
							if (finish == 16)
								//the game is over
								finished();
						} else {
							// hide the card
							setTimeout(hide(openCards, () => {
								openCards = [];
							}), 1000);
						}					
					} else {
						// display the card if only one card shows
						singleMove(card);
					}
				} else {
					openCards.pop();
				}
			}
		})
	})
}

// start the game
restartGame();

// timer eventlistener
deck.addEventListener('click', event => {
	let clickTarget = event.target;
	if (isClickValid(clickTarget)) {
		if (clockOff) {
			startClock();
			clockOff = false;
		}
	}
})

// reset the game eventlistener
restartButtom.addEventListener('click', ()=> {
	restartGame();
});

// close the modal eventlistener
document.querySelector('.modal__cancel').addEventListener('click', ()=> {
	toggleModel();
});

// replay the gamne eventlistener
document.querySelector('.modal__replay').addEventListener('click', ()=> {
	toggleModel();
	restartGame();
});






