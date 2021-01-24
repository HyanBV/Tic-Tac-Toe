//Selecting All Required Elements...

const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");


window.onload = () => {  //Once window loads...
    for (let i = 0; i < allBox.length; i++) { //Adding onclick Attribute To All Available Spans.
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
    selectXBtn.onclick = () => {
        selectBox.classList.add("hide");  //Hiding Box Selection On PlayerX Button Clicked.
        playBoard.classList.add("show"); //Showing Playboard Section On PlayerX Button Clicked.
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide");  //Hiding Box Selection On PlayerO Button Clicked.
        playBoard.classList.add("show"); //Showing Playboard Section On PlayerO Button Clicked.
        players.setAttribute("class", "players active");
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X"; //Assume player will be X.
let runBot = true;

// User Click Function
clickedBox = (element) => {
    if (players.classList.contains("player")) { //If players element contains '.player'...
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //Adding Circle Icon
        players.classList.add("active");
        //If player selects "O", then change playerSign value.
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //Adding Cross Icon
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); //Calling the Winner Function.
    playBoard.style.pointerEvents = "none"; 
    element.style.pointerEvents = "none"; //Once user selects a box, it won't be eligible again.
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //Generating random time delay
    setTimeout(() => {
        bot(runBot); 
    }, randomDelayTime); //passing random delay.
}

//Bot Click Function
bot = (runBot) => {
    if (runBot) { //If runbot is true, then run the following codes.
        //Changing playerSign's value to be the opposite of the Bot's.
        playerSign = "O";
        let array = []; //Empty array where we'll store unselected box indexes.
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { //If span has no child element.
                array.push(i); //Inserting unselected boxes.
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //Getting random index.
        if (array.length > 0) {
            if (players.classList.contains("player")) { //If players element contains '.player'
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //Adding Circle Icon
                players.classList.add("active");
                //If user is "O", then box id will be "X"
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //Adding Cross Icon
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none"; //Once bot selects a box, user can't select it anymore.
        playBoard.style.pointerEvents = "auto";
        playerSign = "X"; //Passing "X" value.
        }
}

//Selecting Winner
getId = (idname) => {
    return document.querySelector(".box" + idname).id; //Returning id name.
}

checkId = (val1, val2, val3, sign) => {
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkId(1,2,3,playerSign) || checkId(4,5,6,playerSign) || checkId(7,8,9,playerSign) || checkId(1,4,7,playerSign) || checkId(2,5,8,playerSign) || checkId(3,6,9,playerSign) || checkId(1,5,9,playerSign) || checkId(3,5,7,playerSign)) {
        //Once match is won, stop the bot.
        runBot = false;
        bot(runBot);
        setTimeout(() => { //Delaying Result.
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 800);

        wText.innerHTML = `Player <p>${playerSign}</p> Wins!`;
    } else {
        //If there's a draw...
        if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => { //Delaying Result.
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 800);
            wText.textContent = `This is a draw!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); //Replay
}