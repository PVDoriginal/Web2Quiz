window.onload= function(){
	const fname = document.getElementById("fname");
	const lname = document.getElementById("lname");
	const food = document.getElementById("food");
	const pass = document.getElementById("pass");
	const btn1 = document.getElementById("btn1");
	const btn2 = document.getElementById("btn2");

	fname.addEventListener("focus", handleTextFocus);
	fname.addEventListener("focusout", handleTextFocusOut);

	lname.addEventListener("focus", handleTextFocus);
	lname.addEventListener("focusout", handleTextFocusOut);

	food.addEventListener("focus", handleTextFocus);
	food.addEventListener("focusout", handleTextFocusOut);

	pass.addEventListener("focus", handleTextFocus);
	pass.addEventListener("focusout", handleTextFocusOut);

	btn1.addEventListener("mouseover", handleButtonHover);
	btn1.addEventListener("mouseout", handleButtonHoverOut);

	btn2.addEventListener("mouseover", handleButtonHover);
	btn2.addEventListener("mouseout", handleButtonHoverOut);


	const labels = document.querySelectorAll('label');
	labels.forEach(label => {
		label.addEventListener("mouseover", handleLabelHover);
		label.addEventListener("mouseout", handleLabelHoverOut);
	});
};

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