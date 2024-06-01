let audio = new Audio("../kahoot.mp3");
let congrats = new Audio("../congrats.mp3");
let wrong = new Audio("../wrong.mp3");
let audio_s1 = new Audio("../audio/audio-s1.mp3");
const possible_colors = ['#FF7ED4', '#EE9322', '#A084E8', '#D895DA', '#FF9EAA'];
let colors = [];
let names = [];
let images = [];
let options = [];
let quotes = [];

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
    

    async function GameLoop(){
        for(let i = 0; i < quotes.length; i++){
            if (current_cover != null) current_cover.remove();
            blackscreen.style.visibility = "hidden";
            await Question(quotes[i]);
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
        audio_s1.play();

        let answer_box = document.createElement("div");
        answer_box.innerHTML = answer;


        blackscreen.style.visibility = "visible";
        blackscreen.style.opacity = 1;
        //await timeout(2500);
        quote_reveal.innerHTML = quote["text"];
        fadeIn();
        await timeout(11500);
        
        if(answer == quote["name"].toUpperCase()){
            congrats.play();
            answer_box.className = "correct-answer";
        }
        else{
            wrong.play();
            answer_box.className = "wrong-answer";
        }

        document.body.appendChild(answer_box);

        await timeout(2500);
        answer_box.remove();
        quote_reveal.innerHTML = "";
    }

    function fadeIn() { 
        var opacity = 1; 
        var intervalID = setInterval(function() { 
            if (opacity > 0.75) { 
                opacity = opacity - 0.0006; 
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
  

