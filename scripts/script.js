playButton.addEventListener("click", function () {
   choose.style.display = "block";
   center.style.display = "none";
})


keyboardButton.addEventListener("click", keyboardpart);
gameButton.addEventListener("click", gamepart);


function keyboardpart() {

   choose.style.display = "none";
   figureJumping.style.display = "none";
   keyboard.style.display = "block";

   let falseEl 
   let letter;
   let isReapetLetter;

   let oneletter = randomLetter();
   letter = document.getElementById(oneletter)
   letter.classList.add("selected");
   
   addEventListener("keyup", function(event){
      if(event.code == oneletter){
         letter.classList.remove("selected");      
         isReapetLetter = oneletter;

         while(true){
            oneletter = randomLetter();
            if(oneletter != isReapetLetter){
               break;
            }
         }
         letter = document.getElementById(oneletter);
         if(letter)
         letter.classList.add("selected");
      }else{
         falseEl = document.getElementById(event.code);
         falseEl.classList.add("hit")

         setTimeout(function(){
            falseEl.classList.remove("hit")
         }, 500)
      }
   })

   returnKeyboardButton.addEventListener("click", function () {
      letter.classList.remove("selected");
      keyboard.style.display = "none";
      figureJumping.style.display = "block";
      choose.style.display = "block";
   })
}


function randomLetter() {
   return letters[Math.floor(Math.random() * letters.length)];
}

function gamepart() {
   choose.style.display = "none";
   countDown.style.display = "block";

   let id = setInterval(function () {
      startCount.innerHTML--;

      if (startCount.innerHTML == 0) {
         clearInterval(id);
         startCount.innerHTML = 3;
         countDown.style.display = "none";
         figureJumping.style.display = "none";
         game.style.display = "block";
         gameF()

      }
   }, 1000)

}

function gameF() {
   input.value = "";
   let time = 5;
   let score = 0;
   let fails = 0;
   let newRecord = false;
   let highScore;
   let oneWord;
   let isReapetWord;
   if (localStorage.length == 0) {
      localStorage.score = 0;
   }

   highScore = localStorage.score;
   oneWord = randomWord()
   word.innerHTML = oneWord;
   elScore.innerHTML = score;
   elHighScore.innerHTML = highScore;
   elTime.innerHTML = time;

   let timeId = setInterval(function () {
      time--;
      elTime.innerHTML = time;
      if (time <= 0) {
         clearInterval(timeId)
         game.style.display = "none";
         gameOver.style.display = "block";
         figureJumping.style.display = "block";
         elFails.innerHTML = fails;
         finalScore.innerHTML = score;
         if (newRecord) {
            elNewRecord.innerHTML = "New record!";
         }
         else {
            elNewRecord.innerHTML = "Game over";
         }
      }

   }, 1000)

   input.onchange = function () {
      if (input.value == oneWord) {
         input.value = "";
         score++;
         time += 5;
         isReapetWord = oneWord;
         while (true) {
            oneWord = randomWord()
            if (isReapetWord != oneWord) {
               break;
            }
         }
         word.innerHTML = oneWord;
         elTime.innerHTML = time;
         elScore.innerHTML = score;
         if (score > highScore) {
            newRecord = true;
            highScore = score;
            elHighScore.innerHTML = highScore;
            localStorage.score = highScore;
         }
      } else {
         input.value = "";
         time -= 2;
         if (score > 0) {
            score--;
         }
         fails++;
         isReapetWord = oneWord;
         while (true) {
            oneWord = randomWord()
            if (isReapetWord != oneWord) {
               break;
            }
         }
         word.innerHTML = oneWord;
         elTime.innerHTML = time;
         elScore.innerHTML = score;
      }
   }
}

function randomWord() {
   return words[Math.floor(Math.random() * words.length)]
}


returnGameButton.addEventListener("click", function () {
   gameOver.style.display = "none";
   game.style.display = "none";
   choose.style.display = "block";
})


