const langToggler = document.getElementsByName('langToggler');
window.onload = () => {
	for (let i = 0; i < langToggler.length; i++) {
		langToggler[i].checked = false	
	}
}

const form = document.querySelector('form');
const target = document.querySelector('p.form-control');

// Form avaliable after lang select
const showTarget = (targetStr) => {
	target.textContent = targetStr;
	document.querySelector('.overlay').style.display = 'none'
}

// Create modal with msg
const showMsg = (msg, is_right) => {
	document.querySelector(".msg").innerHTML = msg;
	$('#resultModal-translate').modal('show');
	document.querySelector('input[name="answer"]').value = '';
	// If answer is correct send selected lang again
	if (is_right) {
		for (let i = 0; i < langToggler.length; i++) {
			if (langToggler[i].checked) {
				sendData(langToggler[i].value);
			}
		}
	}
	
}

// Send selected lang to server
const sendData = (val) => {
	fetch('/translate/lang', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({lang: val})
	})
	.then(response => {
		if (response.status === 200) {
			return response.json()
		}
	})
	.then(data => showTarget(data.msg))
	.catch(err => console.error("lang error: ", err))
}

// Send answer to server
const sendForm = (val) => {
	fetch('/translate/compare', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({answer: val})
	})
	.then(response => {
		if (response.status === 200) {
			return response.json()
		}
	})
	.then(data => {let msg = `<p class="h3">${data.msg}</p>`; showMsg(msg, data.is_right)})
	.catch(err => console.error("lang error: ", err))
}

// Event target val send to server as lang (when clicked)
const checkLang = (item) => {
	item.addEventListener('click', () => sendData(item.value))
}

// Get answer from form
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const answer = document.querySelector('input[name="answer"]').value;
	sendForm(answer);
})

langToggler.forEach(checkLang);

