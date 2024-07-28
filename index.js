document.addEventListener('DOMContentLoaded', function () {
  // grabbing audio elements
  const lobbyMusic = document.getElementById('lobby-audio');
  const menuClickAudio = document.getElementById('menu-click-audio');
  const roleClickAudio = document.getElementById('role-click-audio');

  // Set initial volume
  lobbyMusic.volume = 0.5;
  menuClickAudio.volume = 0.4;
  roleClickAudio.volume = 0.3;

  // Mute/Unmute buttons
  const mutedButton = document.getElementById('muted-button');
  const unmutedButton = document.getElementById('unmuted-button');

  // Check localStorage for mute state
  const isMuted = localStorage.getItem('isMuted') === 'true';

  // Set initial mute state based on localStorage - I have no idea how this even works the way I want it to, but it does
  [lobbyMusic, menuClickAudio, roleClickAudio].forEach((audio) => {
    audio.muted = !isMuted;
  });

  if (!isMuted) {
    unmutedButton.style.display = 'none';
    mutedButton.style.display = 'block';
  } else {
    unmutedButton.style.display = 'block';
    mutedButton.style.display = 'none';
  }

  function toggleMute() {
    const newMuteState = !lobbyMusic.muted;
    [lobbyMusic, menuClickAudio, roleClickAudio].forEach((audio) => {
      audio.muted = newMuteState;
    });

    if (newMuteState) {
      unmutedButton.style.display = 'none';
      mutedButton.style.display = 'block';
      localStorage.setItem('isMuted', 'true');
      console.log('no sound is playing!');
    } else {
      unmutedButton.style.display = 'block';
      mutedButton.style.display = 'none';
      localStorage.setItem('isMuted', 'false');
      console.log('sound is playing!');
    }
  }

  mutedButton.addEventListener('click', toggleMute);
  unmutedButton.addEventListener('click', toggleMute);

  // Navigation logic
  const startButton = document.getElementById('start-button');
  const astronautRole = document.getElementById('astronaut-role');
  const spaceshipRole = document.getElementById('spaceship-role');
  const nextRoundButton = document.getElementById('next-round-button'); // Renamed variable

  startButton.addEventListener('click', function () {
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('selection-section').style.display = 'block';
    menuClickAudio.play();
  });

  astronautRole.addEventListener('click', function () {
    document.getElementById('selection-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    roleClickAudio.play();
  });

  spaceshipRole.addEventListener('click', function () {
    document.getElementById('selection-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    roleClickAudio.play();
  });

  // Next round button sound effect
  nextRoundButton.addEventListener('click', function () {
    menuClickAudio.play();
  });
});

// Game Logic
// document.querySelectorAll('td').forEach((cell) => {
//   cell.addEventListener('click', handleClick, { once: true });
// });

// let currentPlayer = 'X';

// function handleClick(event) {
//   const cell = event.target;
//   cell.innerHTML = currentPlayer;
//   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
// }

// variable with possible win combinations
// const winCombinations = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// // grabbing each box and creating an array from them
// const boxes = Array.from(document.getElementsByTagName('td'));
// // creating variables to set default scores for both player and cpu
// let playerScore = 0;
// let computerScore = 0;

// // creating variables for player and cpu roles
// let playerRole = 'P';
// let computerRole = 'C';

// // for every win combination in the winCombinations array, checks if each index matches our condition (which is if it contains the player's symbol)
// function checkPlayerWin() {
//   return winCombinations.some((combination) => {
//     if (
//       combination.every((index) => {
//         let td = boxes[index];
//         return td.classList.container(playerSymbol.toLowerCase());
//       })
//     ) {
//       // else if win combination IS found, add winning class to the boxes (for styling purposes, to show that the player won)
//       combination.forEach((index) => {
//         boxes[index].classList.add('won');
//       });
//       return true;
//     }
//     return false; // dont execute this code if player does not win
//   });
// }
