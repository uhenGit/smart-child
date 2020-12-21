//const modalToggler = require('helpers.js').modalToggler;
const signBtn = document.querySelector(".sign");
const signContent = document.querySelector(".signContent");
const form = document.querySelector("form");
let firstNumVal, secondNumVal, signState = 0;

// set an  argument to the getRandNum that defines in select-options of expirience
const getRandNum = () => {
	return Math.floor(Math.random()*Math.floor(11));
}
const divByZeroCheck = () => {
	if (signState === 3 && secondNumVal === 0) {
		setRandNum();
		return;
	}
	return false;
}
const setRandNum = () => {
	firstNumVal = getRandNum();
	secondNumVal = getRandNum();
	if (signState === 1 && firstNumVal < secondNumVal) {
		document.querySelector(".firstNum").textContent = secondNumVal;
		document.querySelector(".secondNum").textContent = firstNumVal;
		return;
	}
	divByZeroCheck();
	document.querySelector(".firstNum").textContent = firstNumVal;
	document.querySelector(".secondNum").textContent = secondNumVal;
	return;
}
const showModal = (msg) => {
	document.querySelector(".msg").innerHTML = msg;
	$('#resultModal-math').modal('show');
}
function changeSignState(e) {
	e.preventDefault();
	signState++;
	if (signState < 0 || signState > 3) {
		signState = 0;
	}
	setRandNum();
	let sign;
	switch (signState) {
		case 0:
			sign = "+";
			break;
		case 1:
			sign = "-";
			break;
		case 2:
			sign = "*";
			break;
		case 3:
			sign = "/";
			break;
		default:
			sign = "+";
	}
	signContent.textContent = sign;
}
function getRightAnswer(e) {
	e.preventDefault();
	let rightAnswer;
	let msg;
	let answer = document.querySelector("[name='answer']").value;
	if (isNaN(Number(answer))) {
		$('[data-toggle="popover"]').popover('toggle');
		return false;
	}
	switch (signState) {
		case 0:
			rightAnswer = firstNumVal + secondNumVal;
			break;
		case 1:
			if (firstNumVal < secondNumVal) {
				rightAnswer = secondNumVal - firstNumVal;
				break;
			}
			rightAnswer = firstNumVal - secondNumVal;
			break;
		case 2:
			rightAnswer = firstNumVal * secondNumVal;
			break;
		case 3:
			rightAnswer = firstNumVal / secondNumVal;
			break;
		default:
			rightAnswer = 0;
	}
	if (rightAnswer === Number(answer)) {
		msg = `<h2 class='h2'>Perfect! You are right!</h2>
			<p class='h3'>${firstNumVal} ${signContent.textContent} ${secondNumVal} is equal ${answer}`;
		document.querySelector("[name='answer']").value = '';
		setRandNum();
		divByZeroCheck();
	} else {
		msg = `<h2 class='h2'>Try again</h2>
			<p class='h3'>${firstNumVal} ${signContent.textContent} ${secondNumVal} is not equal ${answer}`;
		document.querySelector("[name='answer']").value = '';
	}
	showModal(msg);
}
window.onload = setRandNum();
form.addEventListener("submit", getRightAnswer);
signBtn.addEventListener("click", changeSignState);
