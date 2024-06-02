//let audio = new Audio("../kahoot.mp3");
window.onload= function(){
	const fname = document.getElementById("fname");
	const lname = document.getElementById("lname");
	const food = document.getElementById("food");
	const pass = document.getElementById("pass");
	const btn1 = document.getElementById("btn1");
	const btn2 = document.getElementById("btn2");
	const create_screen = document.getElementById("create-screen");

	const form = document.querySelector("form");
	const create = document.getElementById("btn1");
	const submit = document.getElementById("btn2");
	const play = document.getElementById("btn3");
	const score = document.getElementById("score");

	if(btn1 == null) console.log("wtf");
	form.addEventListener("submit", async(event)=>{event.preventDefault()});

	play.addEventListener("click", (event)=>{
		window.open("main.html", "_self");
	});

	submit.addEventListener("click", (event)=>{
		if(!validateForm()) return;

		let fd = new FormData();

		fd.set("fname", fname.innerHTML);
		fd.set("lname", lname.innerHTML);
		fd.set("food", food.innerHTML);
		fd.set("pass", pass.innerHTML);
		fd.set("highscore", 0);

		const urlEncoded = new URLSearchParams(fd).toString();
		let a = fetch('../user-login', {
			method: "POST",
			body: urlEncoded,
			headers: {
				'Content-type' : 'application/x-www-form-urlencoded' 
			}
		}).then(res => res.json()).then(data => {
			console.log(data);
			handleUserExistsError(data.error);

			if(data.error == "Logged In!"){ 
				score.innerHTML = "HIGHSCORE: " + data.highscore;
				create.remove();
				submit.remove();
				form.remove();
				play.style.visibility = "visible";
			}
		});
	});

    const timeout = async ms => new Promise(res => setTimeout(res, ms));
	create.addEventListener("click", (event) => {
		if(!validateForm()) return;

		let fd = new FormData();
		showCreateScreen();

		fd.set("fname", fname.innerHTML);
		fd.set("lname", lname.innerHTML);
		fd.set("food", food.innerHTML);
		fd.set("pass", pass.innerHTML);
		fd.set("highscore", 0);

		const urlEncoded = new URLSearchParams(fd).toString();
		fetch('../form-submit', {
			method: "POST",
			body: urlEncoded,
			headers: {
				'Content-type' : 'application/x-www-form-urlencoded' 
			}
		}).then(res => res.json()).then(data => {
			console.log(data);
			handleUserExistsError(data.error);
		});
	});

	async function showCreateScreen(){
		create_screen.style.visibility = "visible";
		await timeout(3000);
		create_screen.style.visibility = "hidden";
	}

	if (window.localStorage.getItem("q2w-fname") != null) fname.innerHTML = localStorage.getItem("q2w-fname");
	if (window.localStorage.getItem("q2w-lname") != null) lname.innerHTML = localStorage.getItem("q2w-lname");
	if (window.localStorage.getItem("q2w-food") != null) food.innerHTML = localStorage.getItem("q2w-food");
	if (window.localStorage.getItem("q2w-pass") != null) pass.innerHTML = localStorage.getItem("q2w-pass");

	fname.addEventListener("focus", handleTextFocus);
	fname.addEventListener("focusout", updateLocalStorage);
	fname.addEventListener("focusout", handleTextFocusOut);

	lname.addEventListener("focus", handleTextFocus);
	lname.addEventListener("focusout", updateLocalStorage);
	lname.addEventListener("focusout", handleTextFocusOut);

	food.addEventListener("focus", handleTextFocus);
	food.addEventListener("focusout", updateLocalStorage);
	food.addEventListener("focusout", handleTextFocusOut);

	pass.addEventListener("focus", handleTextFocus);
	pass.addEventListener("focusout", updateLocalStorage);
	pass.addEventListener("focusout", handleTextFocusOut);

	btn1.addEventListener("mouseover", handleButtonHover);
	btn1.addEventListener("mouseout", handleButtonHoverOut);

	btn2.addEventListener("mouseover", handleButtonHover);
	btn2.addEventListener("mouseout", handleButtonHoverOut);

	play.addEventListener("mouseover", handleButtonHover);
	play.addEventListener("mouseout", handleButtonHoverOut);

	const labels = document.querySelectorAll('label');
	labels.forEach(label => {
		label.addEventListener("mouseover", handleLabelHover);
		label.addEventListener("mouseout", handleLabelHoverOut);
	});
	score.addEventListener("mouseover", handleLabelHover);
	score.addEventListener("mouseout", handleLabelHoverOut);

	function updateLocalStorage(event){
		window.localStorage.setItem("q2w-fname", fname.innerHTML);
		window.localStorage.setItem("q2w-lname", lname.innerHTML);
		window.localStorage.setItem("q2w-food", food.innerHTML);
		window.localStorage.setItem("q2w-pass", pass.innerHTML);
	}

	function validateForm(){		
		let regex = new RegExp(/[a-zA-Z]{2,10}/); 
		if(!regex.test(fname.innerHTML)){
			handleUserExistsError("FIRST NAME MUST BE MADE OF 2-10 LETTERS");
			return false;
		}
		if(!regex.test(lname.innerHTML)){
			handleUserExistsError("LAST NAME MUST BE MADE OF 2-10 LETTERS");
			return false;
		};

		regex = new RegExp(/[a-zA-z0-9]{3,10}/);
		if(!regex.test(pass.innerHTML)){
			handleUserExistsError("PASWORD MUST BE MADE OF 3-10 NUMBERS AND LETTERS");
			return false;
		};

		regex = new RegExp(/[a-zA-z]{3,10}/);
		if(!regex.test(food.innerHTML)){
			handleUserExistsError("FOOD NAME MUST BE MADE OF 3-10 LETTERS");
			return false;
		};

		return true;
	}
};

var error = null;

function handleUserExistsError(error_text){
	if(error != null){ 
		error.remove();
		error = null;
	}
	error = document.createElement("div");
	error.innerHTML = error_text;
	error.className = "error";
	error.classList.add("shake");
	error['used'] = false;

	document.body.appendChild(error);
	error.addEventListener("mouseover", handleGoAway);
}

function handleGoAway(event){
	if(event.target['used']) return;
	event.target.classList.add("goaway" + Math.floor(Math.random() * 3 + 1));
	event.target['used'] = true;
}

function handleTextFocus(event){
	if (event.target.innerHTML == '...') event.target.innerHTML = '';
}

function handleTextFocusOut(event){
	if (event.target.innerHTML == '') event.target.innerHTML = '...';
}

function handleButtonHover(event){
	event.target.className = "btn-hover";
}

function handleButtonHoverOut(event){
	event.target.className = "btn-not-hover";
}

function handleLabelHover(event){
	event.target.className = "label-hover-in";
}

function handleLabelHoverOut(event){
	event.target.className = "label-hover-out";
}