// to circumvent calling 'document.getElementById('id');' a million times
function ID(elementId) {
    return document.getElementById(elementId);
};

// Tracks what puzzle the user is on
let currentPuzzle = 1;
// save the users answers
let answers = new Array(5).fill(null)
// Correct answers
let solutions = new Array("option1", "option1", "option1", "option1", "option1")

// Hides the initial view on button click and displays the puzzle view.
function startPuzzle() {
	initial.style.display = 'none';
    puzzle.style.display = 'block';
    updatePuzzle(currentPuzzle);
}

// changes the view based on the puzzle number.
function updatePuzzle(currentPuzzle) {
	switch (currentPuzzle) {
		case 1:
			ID("puzzle-img").src = './data/exercise_A.jpg';
			ID("option1-text").textContent = 'Option 1';
			ID("option2-text").textContent = 'Option 2';
			ID("option3-text").textContent = 'Option 3';
			ID("optionEmpty").checked = true;
            ID("back-btn").disabled = true;
			break;
		case 2:
			ID("puzzle-img").src = './data/image_B.jpg';
			ID("option1-text").textContent = 'Option 4';
			ID("option2-text").textContent = 'Option 5';
			ID("option3-text").textContent = 'Option 6';
			ID("optionEmpty").checked = true;
			ID("back-btn").style.display = 'inline-block';
            ID("back-btn").disabled = false;
			break;
		case 3:
			ID("puzzle-img").src = './data/image_C.jpg';
			ID("option1-text").textContent = 'Option 7';
			ID("option2-text").textContent = 'Option 8';
			ID("option3-text").textContent = 'Option 9';
			ID("optionEmpty").checked = true;
			break;
		case 4:
			ID("puzzle-img").src = './data/image_D.jpg';
			ID("option1-text").textContent = 'Option 10';
			ID("option2-text").textContent = 'Option 11';
			ID("option3-text").textContent = 'Option 12';
			ID("optionEmpty").checked = true;
			ID("next-btn").disabled = false;
			ID("finish-btn").style.display = 'none';
			break;
		case 5:
			ID("puzzle-img").src = './data/image_E.jpg';
			ID("option1-text").textContent = 'Option 13';
			ID("option2-text").textContent = 'Option 14';
			ID("option3-text").textContent = 'Option 15';
			ID("optionEmpty").checked = true;
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
		setRadio()
        ID("puzzle-number").innerText  = 'Puzzle ' +  currentPuzzle + '/5';
	}
    //console.log("aiogfuhapiefgba8izwegf8iewgfaiwezugfapö<iewzfgbapöiugfpöaeiugf")
}

// Checks if there is a previous puzzle and calls updatePuzzlethen calls saveSolution and updatePuzzle
function goBack() {
    if (currentPuzzle > 1) {
		saveSolution()
        currentPuzzle--;
        updatePuzzle(currentPuzzle);
		setRadio()
        //update header
        ID("puzzle-number").innerText  = 'Puzzle ' +  currentPuzzle + '/5';
    }
}

// Saves the selected radio button into the solution array by its id.
function saveSolution() {
	const selectedOption = document.querySelector('input[name="option"]:checked').id;
	console.log(selectedOption);
	answers[currentPuzzle] = selectedOption;
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
	for (const element of answers) {
		if (element == "option1") {
			score += 1;
		}
	}
	ID("score").textContent = score.toString() + "/5";
}

function finishQuizz() {
	if (!confirm("Are you sure you want to submit?")) { // != true) {
    	return;
  	}
    puzzle.style.display = 'none';
	result.style.display = 'block';
	evaluateScore();
	// call emailPromt after 3000 miliseconds
	setTimeout(() => {
		console.log("Delayed for 3 second.");
		emailPromt()
	}, 3000);

}

function emailPromt() {
	// result.style.display = 'none';
	// emailPrompt.style.display = 'block'
	prompt("Enter your email to receive further Quizzes.", "example@email.com");
}