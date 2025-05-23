let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r')
    playGame('rock');
  else if (event.key === 'p')
    playGame('paper');
  else if (event.key === 's')
    playGame('scissors');
  else if (event.key === 'a')
    autoPlay();
  else if (event.key === 'Backspace') {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }

  if (isAutoPlaying) {
    autoPlayElement.innerHTML = 'Stop Playing';
  } else {
    autoPlayElement.innerHTML = 'Auto Play';
  }
}

);

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    const confirmBox = document.querySelector('.js-confirm-reset');

    confirmBox
      .innerHTML = `
        <p>Are you sure to reset score</p>
        <button class = "js-confirm-yes button-confirm-yes">Yes</button>
        <button class = "js-confirm-no button-confirm-no">No</button>
        `;

    confirmBox.style.display = 'block';

    document.querySelector('.js-confirm-yes')
      .addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        confirmBox.style.display = 'none';
      });

    document.querySelector('.js-confirm-no')
      .addEventListener('click', () => {
        confirmBox.style.display = 'none';
      });
  });


const autoPlayElement = document.querySelector('.js-autoplay-button');

autoPlayElement.addEventListener('click', () => {
  autoPlay();

  if (isAutoPlaying) {
    autoPlayElement.innerHTML = 'Stop Playing';
  } else {
    autoPlayElement.innerHTML = 'Auto Play';
  }
});


let isAutoPlaying = false;
let intervalId;

function autoPlay() {

  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);

    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.')
    score.wins += 1;
  else if (result === 'You lose.')
    score.losses += 1;
  else if (result === 'Tie.')
    score.ties += 1;


  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
      <img src="images/${playerMove}-emoji.png" class="move-icon"> Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}