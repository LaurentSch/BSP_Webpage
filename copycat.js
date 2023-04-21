//import "smtp";
// const FuzzySet = require('fuzzyset')
// to circumvent calling 'document.getElementById('id');' a million times
function ID(elementId) {
    return document.getElementById(elementId);
};

// Tracks what puzzle the user is on
let currentPuzzle = 1;
// array with the questions
let questions = new Array(4)
questions[0] = "A father and son have a car accident and are both badly hurt. They are both taken to separate hospitals. When the boy is taken in for an operation, the surgeon (doctor) says 'I can not do the surgery because this is my son'. \n How is this possible?";
questions[1] = "A classic greek riddle: \nWhat goes on four legs in the morning, \ntwo legs in the afternoon, and \nthree legs in the evening?";
questions[2] = "What always runs but never walks. \nOften murmurs, never talks. \nHas a bed but never sleeps. \nAn open mouth that never eats. \nWhat is it?";
questions[3] = "I'm a thief that cannot be caught, \nStealing moments that cannot be bought. \nI'm the reason for the rising sun, \nAnd the setting of the day when it's done. \nWhat am I?"
// Correct answers nested array
let solutions = new Array(4);
solutions[0] = new Array("mom", "mother", "mum");
solutions[1] = new Array("human", "person", "man");
solutions[2] = new Array("river", "stream");
solutions[3] = new Array("time")
// save the users answers
let answers = new Array(4).fill(null);
// set timer in seconds
let timeLeft = 300;
let countdownTimer;
// save user information
// let email = "None";
let prolificId = "None"


// use FuzzySet to account for missspelling of the words
// let solutions_fuzzy = new Array(5);
// solutions_fuzzy[0] = solutions[0].map(answer => FuzzySet([answer]));
// solutions_fuzzy[1] = solutions[1].map(answer => FuzzySet([answer]));
// solutions_fuzzy[2] = solutions[2].map(answer => FuzzySet([answer]));



// Hides the initial view on button click and displays the puzzle view.
function startPuzzle() {
	initial.style.display = 'none';
    puzzle.style.display = 'block';
    updatePuzzle(currentPuzzle);
	updateTimer();
    countdownTimer = setInterval(updateTimer, 1000);
}

// changes the view based on the puzzle number.
function updatePuzzle(currentPuzzle) {
	switch (currentPuzzle) {
		case 1:
			ID("puzzle-number").innerText  = 'Let\'s start with a translation problem.\n Puzzle 1/4:';
			ID("puzzle-img").src = './data/hospital.png';
			ID("puzzle-text").innerText = questions[0];
			ID("answer").value = answers[currentPuzzle]
			ID("back-btn").disabled = true;
			break;
		case 2:
			ID("puzzle-number").innerText = 'El classico.\n Puzzle 2/4:';
			ID("puzzle-img").src = './data/sphinx.png';
			ID("puzzle-text").innerText = questions[1];
			ID("back-btn").style.display = 'inline-block';
            ID("back-btn").disabled = false;
			break;
		case 3:
			ID("puzzle-number").innerText  = 'A bit more difficult.\n Puzzle 3/4:';
			ID("puzzle-img").src = './data/nguruvilu.png';
			ID("puzzle-text").innerText = questions[2];
			ID("next-btn").disabled = false;
			ID("finish-btn").style.display = 'none';
			break;
		case 4:
			ID("puzzle-number").innerText  = 'Almost there.\n Puzzle 4/4:';
			ID("puzzle-img").src = './data/fox_thief.png';
			ID("puzzle-text").innerText = questions[3];
			ID("next-btn").disabled = true;
			ID("finish-btn").style.display = 'inline-block';
			break;
		default:
			break;
	}
}

// Checks if there is a next puzzle then calls saveSolution and updatePuzzle
function goNext() {
	if (currentPuzzle < 5) {
		saveSolution()
		currentPuzzle++;
		updatePuzzle(currentPuzzle);
		ID("answer").value = answers[currentPuzzle - 1]
        // ID("puzzle-number").innerText  = 'Puzzle ' +  currentPuzzle + '/5';
	}
    //console.log("aiogfuhapiefgba8izwegf8iewgfaiwezugfapö<iewzfgbapöiugfpöaeiugf")
}

// Checks if there is a previous puzzle and calls updatePuzzlethen calls saveSolution and updatePuzzle
function goBack() {
    if (currentPuzzle > 1) {
		saveSolution()
        currentPuzzle--;
        updatePuzzle(currentPuzzle);
		ID("answer").value = answers[currentPuzzle - 1]
		
        //update header
        // ID("puzzle-number").innerText  = 'Puzzle ' +  currentPuzzle + '/5';
    }
}

// Saves the selected radio button into the solution array by its id.
function saveSolution() {
	answers[currentPuzzle - 1] = ID("answer").value
	
}

// sets the radio button to the users response
function setRadio() {
	if (answers[currentPuzzle] != null) {
		switch (answers[currentPuzzle]) {
			case "option1":
				ID("option1").checked = true;
				break;
			case "option2":
				ID("option2").checked = true;
				break;
			case "option3":
				ID("option3").checked = true;
				break;
		}
	} else {
		ID("optionEmpty").checked = true;
	}
}


// Checks how many of the answers are correct. (Sample implementation: 1 is always correct.)
function evaluateScore() {
	let score = 0;
	for (let i = 0; i < solutions.length; i++) {
		let answer_prep = prepare_answer(answers[i]);
		for (let j = 0; j < answer_prep.length; j++) {
			for (let m = 0; m < solutions[i].length; m++) {
				console.log("Check if answer_prep[j]" + answer_prep[j] + " == " + solutions[i][m]);
				if (answer_prep[j] == solutions[i][m]) {
					score++;
				}
			}
		}
	}
	ID("score").innerText = "Your Result is: " + score.toString() + "/4";
}

// split the user input into a list of words that were seperated by a space and put everything to lowercase
function prepare_answer(answer) {
	if (answer == null) {	
		return new Array()
	}
	console.log(answer)
	let prep = answer.toLowerCase();
	let prep_array = prep.split(" ");
	return prep_array
}

function finishQuizz() {
	const finish_modal = ID("finish-modal");
	finish_modal.showModal();
	ID("cancel").addEventListener("click", () => {
		finish_modal.close();
	});
	ID("finish-quizz").addEventListener("click", () => {
		finish_modal.close();
		finalPageSetup();
	});
}

function finalPageSetup() {
	saveSolution();
	puzzle.style.display = 'none';
	result.style.display = 'block';
	evaluateScore();
	// call emailPromt after 3000 miliseconds
	setTimeout(() => {
		console.log("Delayed for 6 second.");
		emailPromt()
	}, 6000);
}

function emailPromt() {
	// result.style.display = 'none';
	// emailPrompt.style.display = 'block'
	//prompt("Enter your email to receive further Quizzes.", "example@email.com");
	const modal = ID('modal');
	modal.showModal();
	ID("close-modal").addEventListener("click", () => {
		modal.close();

		smtpCode("None");
	});
}

function submitEmail() {
	console.log("Test");
	let email = ID("email").value;
	smtpCode(email);
	const modal = ID('modal');
	modal.close();
}

// Takes a string with the users email and sends an email with these fields to Host
function smtpCode(email) {
	smpt.Email.send({
		Host : "smtp.gmail.com",
		Username : "translucent.traveler@gmail.com",
		Password : "XXX",
		To : 'laurent.schmidt.001@student.uni.lu',
		From : "confirmshame@BSP.com",
		Subject : "Confirmshame Prompt submission",
		Body : "Time spend," + (300 - timeLeft) + "\n"
			+ "Email," + email + "\n"
			+ "prolific id," + prolificId + "\n"
	}).then(
  		console.log("The email was sent")
	);
}

function updateTimer() {
	// Calculate the minutes and seconds remaining
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	// Format the minutes and seconds with leading zeros
	const formattedMinutes = minutes.toString().padStart(2, '0');
	const formattedSeconds = seconds.toString().padStart(2, '0');

	// Update the timer text
	ID("timer").textContent = `${formattedMinutes}:${formattedSeconds}`;

	// Check if the countdown has ended
	if (timeLeft === 0) {
		clearInterval(countdownTimer);
		finalPageSetup();
	} else {
		timeLeft--;
	}
}