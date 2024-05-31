let audio = new Audio("../kahoot.mp3");
const possible_colors = ['#FF7ED4', '#EE9322', '#A084E8', '#D895DA', '#FF9EAA'];
let colors = [];
let names = [];
let options = [];

window.onload= function(){
    const cover = document.getElementById("kahoot-cover");
    cover.onclick = (event) => {
        cover.style.visibility = "hidden";
        audio.play();
        audio.loop = true;
    }

    const optionsParent = document.getElementById("options");
    const search_bar = document.getElementById("search");

    fetch("/options.json").then(res => res.json()).then(options => {
        names = options['names']; 
        shuffle(names);
        createOptions();
    });

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
  

