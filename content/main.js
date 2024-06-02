let audio = new Audio("../kahoot.mp3");
let congrats = new Audio("../congrats.mp3");
let wrong = new Audio("../wrong.mp3");
const possible_colors = ['#FF7ED4', '#EE9322', '#A084E8', '#D895DA', '#FF9EAA'];
let colors = [];
let names = [];
let images = [];
let options = [];
let quotes = [];
let audio_s = [new Audio("../audio/audio-s1.mp3"), new Audio("../audio/audio-s2.mp3"), new Audio("../audio/audio-s3.mp3"), new Audio("../audio/audio-s4.mp3")];

let score = 0;
let count = 0;

window.onload= function(){
    const cover = document.getElementById("kahoot-cover");
    const blackscreen = document.getElementById("blackscreen");
    const quote_reveal = document.getElementById("quote-reveal"); 
    blackscreen.style.visibility = "hidden";
    blackscreen.style.opacity = "0";
    cover.onclick = (event) => {
        cover.style.visibility = "hidden";
        audio.play();
        audio.loop = true;
    }

    const optionsParent = document.getElementById("options");
    const search_bar = document.getElementById("search");
    const quote_text = document.getElementById("quote");

    fetch("/quotes.json").then(res => res.json()).then(data => {
        names = data['names']; 
        quotes = data['quotes'];
        images = data['images'];
        shuffle(names);
        console.log(quotes.length);
        shuffle(quotes);
        shuffle(quotes);
        shuffle(quotes);
        createOptions();
        GameLoop();
    });

    let clickedOption = null;
    function createOptions(){
        if (colors.length == 0){
            for (let i = 0; i < names.length; i++){
                colors.push(possible_colors[Math.floor(Math.random() * possible_colors.length)]);
            }
        }

        options.forEach(element => {
            element.remove();
        });

        options = [];

        for (let i = 0; i < names.length; i++) {
            if(search_bar.innerHTML != "WHO ARE YOU LOOKING FOR?" && search_bar.innerHTML != "" && !names[i].includes(search_bar.innerHTML.toUpperCase())) continue;
            let option = document.createElement('span');
            option.innerHTML = names[i];
            option.className = "option";
            option.style.border = "4px dotted " + colors[i];
            optionsParent.appendChild(option);
            options.push(option);
            option.onmouseenter = handleOptionHover;
            option.onmouseleave = handleOptionHoverOut;
            option.onclick = (event) => {clickedOption = event.target.innerHTML;};
        }
    }
    let refreshInterval;
    search_bar.onfocus = function(event){
        refreshInterval = setInterval(createOptions, 100);
        if(search_bar.innerHTML == "WHO ARE YOU LOOKING FOR?") search_bar.innerHTML = "";
        search_bar.style.color = "#363062";
    }

    search_bar.addEventListener("focusout", function(event){
        clearInterval(refreshInterval);
        if(search_bar.innerHTML == ""){ 
            search_bar.innerHTML = "WHO ARE YOU LOOKING FOR?";
            search_bar.style.color = "#9bbdf1a7";
        }
    });

    const back = document.getElementById("back");
    back.onmouseenter = function(event){
        event.target.classList.remove('option-hoverout');
        event.target.classList.add('option-hover');
    };
    back.onmouseleave = function(event){
        event.target.classList.remove('option-hover');
        event.target.classList.add('option-hoverout');
    };
    back.onmousedown = function(event){
        window.open("login.html", "_self");
    }

    function handleOptionHover(event){
        event.target.classList.remove('option-hoverout');

        let borderAttrb = window.getComputedStyle(event.target).border.split(' ');
        let borderColor = borderAttrb[2] + " " + borderAttrb[3] + " " + borderAttrb[4];  

        event.target.style.backgroundColor = borderColor;
        event.target.classList.add('option-hover');
    }

    function handleOptionHoverOut(event){
        event.target.classList.remove('option-hover');
        event.target.style.backgroundColor = 'transparent';
        event.target.classList.add('option-hoverout');
    }
    
    const count_text = document.getElementById("count");

    async function GameLoop(){
        for(let i = 0; i < quotes.length; i++){
            if (current_cover != null) current_cover.remove();
            blackscreen.style.visibility = "hidden";
            await Question(quotes[i]);

            count++;
            count_text.innerHTML = count + "/20";
            if(count == 20) break;

            audio.currentTime = 0;
            audio.play();
        }
        window.open("login.html", "_self");
    }

    const timeout = async ms => new Promise(res => setTimeout(res, ms));
    async function Question(quote){
        quote_text.innerHTML = quote["text"];
        while(clickedOption == null) await timeout(10);
        await Reveal(clickedOption, quote);
    }

    let current_cover = null;

    async function Reveal(answer, quote){
        clickedOption = null;
        current_cover = SetCover(quote["name"]);
        audio.pause();
        audio.currentTime = 0;
        audio_s[Math.floor(Math.random() * audio_s.length)].play();

        let answer_box = document.createElement("div");
        answer_box.innerHTML = quote["name"].toUpperCase();


        blackscreen.style.visibility = "visible";
        blackscreen.style.opacity = 1;
        //await timeout(2500);
        quote_reveal.innerHTML = quote["text"];
        fadeIn();
        await timeout(5500);
        
        if(answer == quote["name"].toUpperCase()){
            score += 1000;
            congrats.play();
            answer_box.className = "correct-answer";
            updateScore(score);
        }
        else{
            wrong.play();
            answer_box.className = "wrong-answer";
        }

        document.getElementById("score").innerHTML = score;

        document.body.appendChild(answer_box);

        await timeout(2500);
        answer_box.remove();
        quote_reveal.innerHTML = "";
    }

    function fadeIn() { 
        var opacity = 1; 
        var intervalID = setInterval(function() { 
            if (opacity >= 0.5) { 
                opacity = opacity - 0.01; 
                blackscreen.style.opacity = opacity; 
            } else { 
                clearInterval(intervalID); 
            } 
        }, 40); 
    } 

    function SetCover(name){
        let img_cover = document.createElement("img");
        let img_names = images[name];
        let img = img_names[Math.floor(Math.random() * img_names.length)];
        img_cover.className = "cover";
        img_cover.src = "content/images/" + img; 
        document.body.appendChild(img_cover);
        return img_cover;
    }
}

function updateScore(score){
    
	let fd = new FormData();

	fd.set("fname", localStorage.getItem("q2w-fname"));
	fd.set("lname", localStorage.getItem("q2w-lname"));
	fd.set("food", localStorage.getItem("q2w-food"));
	fd.set("pass", localStorage.getItem("q2w-pass"));
	fd.set("highscore", score);

	const urlEncoded = new URLSearchParams(fd).toString();
	let a = fetch('../update-score', {
		method: "POST",
		body: urlEncoded,
		headers: {
			'Content-type' : 'application/x-www-form-urlencoded' 
		}
    });
}


function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  

