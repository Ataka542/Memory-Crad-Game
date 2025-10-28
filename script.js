/*let backgroundMusic = new Audio("bgm.mp3");
     backgroundMusic.loop = true;
     backgroundMusic.volume = 0.3;
     backgroundMusic.play().catch(error =>
     console.log("Autoplay prevented:", error));
     
     let gameOverSound = new Audio("gameOver.mp3");
     gameOverSound.volume = 0.9;
     
     let btnClick = new Audio("btnClick.mp3");
     btnClick.volume = 0.9;
     
     let failSound = new Audio("failSound.mp3");
     failSound.volume = 0.6;*/
     
	function removeSoundBox(){
		backgroundMusic.pause();
		document.getElementById('sound-box').style.display = "none";
		document.getElementById('dark').style.display = "none";
		document.getElementById("back-lights").style.display = "none";
		soundCheck();
	}

     function playGame(){
       
          document.getElementById("menu").style.display = "none";
          document.getElementById("container").style.display = "block";
          document.getElementById("close").style.display = "block";
          document.getElementById("back-lights").style.display = "none";
          document.getElementById("how-to-play").style.display = "none";
          document.getElementById("settings-container").style.display = "none";
          document.getElementById("sound-box").style.display = "none";
          document.getElementById("dark").style.display = "none";
          backgroundMusic.pause();
	   soundCheck();
     }
      function goToMenu(){
	   document.getElementById("menu").style.display = "block";
           document.getElementById("sound-box").style.display = "none";
	   document.getElementById("first-box").style.display = "none";
           document.getElementById("dark").style.display = "none";
          document.getElementById("container").style.display = "none";
          document.getElementById("how-to-play").style.display = "none";
           document.getElementById("settings-container").style.display = "none";
           document.getElementById("close").style.display = "none";
           document.getElementById("back-lights").style.display = "none";
           document.getElementById("gameOverBox").style.display = "none";
           restartGame();
           moves.innerHTML = 10;
	   musicCheck();
	   soundCheck();
      }
      
      function howToPlay(){
          //btnClick.play();
          document.getElementById("menu").style.display = "none";
          document.getElementById("container").style.display = "none";
          document.getElementById("how-to-play").style.display = "block";
          document.getElementById("dark").style.display = "block";
           document.getElementById("settings-container").style.display = "none";
           document.getElementById("close").style.display = "none";
           //backgroundMusic.play();
	   musicCheck();
	   soundCheck();
      }
      
      function soundBox(){
          
          document.getElementById("sound-box").style.display = "block";
          document.getElementById("dark").style.display = "block";
          document.getElementById("back-lights").style.display = "block";
	  musicCheck();
	  soundCheck();
      }
      
      /*function settings(){
          btnClick.play();
          document.getElementById("menu").style.display = "none";
          document.getElementById("container").style.display = "none";
          document.getElementById("how-to-play").style.display = "none";
           document.getElementById("settings-container").style.display = "block";
           document.getElementById("close").style.display = "none";
           backgroundMusic.play();
      }*/
function displaySettingsContainer(){
     document.getElementById("settings-container").style.display = "block";
     document.getElementById("dark").style.display = "block";
     document.getElementById("menu").style.display = "none";
     document.getElementById("back-lights").style.display = "block";
     soundCheck();
     musicCheck();
}
      
      function pauseGame(){
         
           //document.getElementById("pause-box").style.display = "block";
           document.getElementById("dark").style.display = "block";
		musicCheck();
	   soundCheck()
      }
      function resumeGame(){
           //document.getElementById("pause-box").style.display = "none";
           document.getElementById("dark").style.display = "none";
	   backgroundMusic.pause();
	   soundCheck()
      }
     
          function restartGame(){
               const emojis = ['A','B','X','Y','Z','W','C','T'];
               let cards = [...emojis, ...emojis];
               let flippedCards = [];
               let matchedCards = [];
               document.getElementById('gameOverBox').style.display = 'none';
               document.getElementById('back-lights').style.display = 'none';
               document.getElementById('dark').style.display = 'none';

               function shuffle(array){
                    return array.sort(() => Math.random() - 0.4);
               }
               function createBoard(){
                    const board = document.querySelector('.game-board');
                    board.innerHTML = '';
                    shuffle(cards).forEach((emoji, index) =>{
                         const card = document.createElement('div');
                         card.classList.add('card');
                         card.dataset.emoji = emoji;
                         card.dataset.index = index;
                         card.addEventListener('click', flipCard);
                         board.appendChild(card);
                         
                    });
               }
               
               function flipCard(){
                    if (flippedCards.length < 2 && !this.classList.contains('flipped')){
                         this.textContent = this.dataset.emoji;
                         this.classList.add('flipped');
                         flippedCards.push(this);
                         btnClick.play();
                         
                         if (flippedCards.length === 2){
                              setTimeout(checkMatch, 700);
                         }
                    }
               }
               
               function checkMatch(){
                    const [card1, card2] = flippedCards;
                    
                    if (card1.dataset.emoji === card2.dataset.emoji){
                         matchedCards.push(card1,card2);
                         gameOverSound.play();
                    }else{
                         card1.classList.remove('flipped');
                         card2.classList.remove('flipped');
                         card1.textContent = '';
                         card2.textContent = '';
                         
                         failSound.play();
                         let moves = document.getElementById("moves");
                         moves.innerHTML = moves.innerHTML - 1;
                         console.log(moves.innerHTML);


                         if(moves.innerHTML < 1){
                                let overMessage = document.getElementById('over-message')
                                overMessage.innerHTML = 'you lose';
                                let overMoves = document.getElementById('over-moves');
                                overMoves.innerHTML = moves.innerHTML;
                              document.getElementById("gameOverBox").style.display = "block";
                              document.getElementById("dark").style.display = "block";
                              document.getElementById("back-lights").style.display = "block";

                         };
                    }
                    
                    flippedCards = [];
                    
                    if (matchedCards.length === cards.length){
                         setTimeout(() => gameOver(), 300);
                         gameOverSound.play();
                         let overMessage = document.getElementById('over-message')
                          overMessage.innerHTML = 'you win';
                          let overMoves = document.getElementById('over-moves');
                         overMoves.innerHTML = moves.innerHTML;
                         document.getElementById("gameOverBox").style.display = "block";
                         document.getElementById("dark").style.display = "block";
                         document.getElementById("back-lights").style.display = "block";
                    }
               }
               
               createBoard();
          };
          
          
          restartGame()
          
          function restartNewGame(){
               btnClick.play();
               matchedCards = [];
               flippedCards = [];
               totalMatches = 0;
               removeGameOver();
               restartGame();
               gameOver = false;
               moves.innerHTML = 10;
          }
          function gameOver(){
               gameOverSound.play();
               document.getElementById("gameOverBox").style.display = "block";
               document.getElementById("dark").style.display = "block";    
          }          
          
          function removeGameOver(){
               document.getElementById("gameOverBox").style.display = "none";
               document.getElementById("dark").style.display = "none";
          }

let backgroundMusic = new Audio("bgm.mp3");
     backgroundMusic.loop = true;
     backgroundMusic.volume = 0.5;
     backgroundMusic.play().catch(error =>
     console.log("Autoplay prevented:", error));
     
     let gameOverSound = new Audio("gameOver.mp3");
     gameOverSound.volume = 0.9;
     
     let btnClick = new Audio("btnClick.mp3");
     btnClick.volume = 0.9;
     
     let failSound = new Audio("failSound.mp3");
     failSound.volume = 0.6;


let soundMessage = document.getElementById("soundMessage");
let soundMessageTwo = document.getElementById("soundMessageTwo");
let musicMessage = document.getElementById("musicMessage");
let musicMessageTwo = document.getElementById("musicMessageTwo");
//let gameSoundMessage = document.getElementById("gameSoundMessage");
function offSound(){
     soundCheck();
     soundMessage.innerHTML = "off";
     soundMessageTwo.innerHTML = "off";
     //gameSoundMessage.innerHTML = "off";
     soundMessage.style.color = 'red';
     soundMessageTwo.style.color = 'red';
}
function onSound(){
     soundCheck();
     soundMessage.innerHTML = "on";
     soundMessageTwo.innerHTML = "on";
     //gameSoundMessage.innerHTML = "on";
     soundMessage.style.color = 'green';
     soundMessageTwo.style.color = 'green';
}
function soundCheck(){
     if (soundMessage.innerHTML == "on" /*&& gameSoundMessage.innerHTML == "on"*/){
          btnClick.play();
     }else{
          btnClick.pause();
     }
}

function offMusic(){
     musicMessage.innerHTML = "off";
     musicMessageTwo.innerHTML = "off";
     musicMessage.style.color = 'red';
     musicMessageTwo.style.color = 'red';
     musicCheck();
     soundCheck();
}
function onMusic(){
     musicMessage.innerHTML = "on";
     musicMessageTwo.innerHTML = "on";
     musicMessage.style.color = 'green';
     musicMessageTwo.style.color = 'green';
     musicCheck();
     soundCheck();
}
function musicCheck(){
     if (musicMessage.innerHTML == "on"){
          backgroundMusic.play();
     }else{
          backgroundMusic.pause();
     }
};

          