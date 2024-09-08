document.addEventListener('DOMContentLoaded', function () {
  // adding audio elements
  const lobbyMusic = document.getElementById('lobby-audio');
  const menuClickAudio = document.getElementById('menu-click-audio');
  const roleClickAudio = document.getElementById('role-click-audio');
  const gameplayClick = document.getElementById('gameplay-click-audio');
  const cpuGameplayClick = document.getElementById('cpu-gameplay-click-audio');

  // Set initial volume
  lobbyMusic.volume = 0.2;
  menuClickAudio.volume = 0.2;
  roleClickAudio.volume = 0.2;
  gameplayClick.volume = 0.2;
  cpuGameplayClick.volume = 0.2;

  // Mute/Unmute buttons
  const mutedButton = document.getElementById('muted-button');
  const unmutedButton = document.getElementById('unmuted-button');

  // Check localStorage for mute state
  const isMuted = localStorage.getItem('isMuted') === 'true';

  // Set initial mute state based on localStorage - I have no idea how this even works the way I want it to, but it does
  [
    lobbyMusic,
    menuClickAudio,
    roleClickAudio,
    gameplayClick,
    cpuGameplayClick,
  ].forEach((audio) => {
    audio.muted = isMuted;
  });

  if (isMuted) {
    unmutedButton.style.display = 'none';
    mutedButton.style.display = 'block';
  } else {
    unmutedButton.style.display = 'block';
    mutedButton.style.display = 'none';
  }

  function toggleMute() {
    const newMuteState = !lobbyMusic.muted;
    [
      lobbyMusic,
      menuClickAudio,
      roleClickAudio,
      gameplayClick,
      cpuGameplayClick,
    ].forEach((audio) => {
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
  let astronautRole = document.getElementById('astronaut-role');
  let alienRole = document.getElementById('alien-role');
  let userRole = '';
  let cpuRole = '';

  startButton.addEventListener('click', function () {
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('selection-section').style.display = 'block';
    menuClickAudio.play();
  });

  astronautRole.addEventListener('click', function () {
    document.getElementById('selection-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    roleClickAudio.play();

    userRole = astronautRole;
    cpuRole = alienRole;
  });

  alienRole.addEventListener('click', function () {
    document.getElementById('selection-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    roleClickAudio.play();

    userRole = alienRole;
    cpuRole = astronautRole;
  });

  // role selector logic

  isAstronautRoleClicked = false;
  isAlienRoleClicked = false;

  astronautRole.addEventListener('click', () => {
    if ((astronautRole = 'clicked')) {
      isAstronautRoleClicked = true;
      userRole = astronautRole;
      cpuRole = alienRole;
      console.log('Astronaut role clicked');
    }
  });

  alienRole.addEventListener('click', () => {
    if ((alienRole = 'clicked')) {
      isAlienRoleClicked = true;
      userRole = alienRole;
      cpuRole = astronautRole;
      console.log('Alien role clicked');
    }
  });

  // game logic

  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let boxes = document.getElementsByTagName('td');
  const alienClass = 'alien';
  const astronautClass = 'astronaut';
  let playerScore = document.getElementById('player-score-num');
  let cpuScore = document.getElementById('cpu-score-num');
  let gameActive = true;
  let isCpuTurn = false;
  const resultMessage = document.getElementById('result-message');
  const subResultMsg = document.getElementById('sub-result-message');
  const nextRoundButton = document.getElementById('next-round-button'); // Renamed variable

  Array.from(boxes).forEach((box, index) => {
    box.addEventListener('click', (e) => {
      // Check if the move is valid
      if (!gameActive || box.innerHTML !== '' || isCpuTurn) {
        return; // Exit the function if the move is not valid
      }

      console.log(`box ${index} clicked`);

      // Apply user's move

      gameplayClick.play();
      box.innerHTML =
        userRole === astronautRole
          ? '<img src="icons/astronaut.png" alt="Astronaut" style="width: 75px;" />'
          : '<img src="icons/alien.png" alt="Alien" style="width: 75px;" />';
      // Style the result message

      box.classList.add(
        userRole === astronautRole ? astronautClass : alienClass,
      );
      // Add these styles to center the image
      box.style.justifyContent = 'center';
      box.style.alignItems = 'center';

      if (checkWin(userRole)) {
        endGame(userRole);
      } else if (checkDraw()) {
        endGame('draw');
      } else {
        isCpuTurn = true;
        setTimeout(executeCpuTurn, 500);
      }
    });
  });

  function checkDraw() {
    return Array.from(boxes).every((box) => box.innerHTML !== '');
  }

  function checkWin(role) {
    return winCombinations.some((combination) => {
      const boxesInCombination = combination.map((i) => boxes[i]);
      return boxesInCombination.every((box) =>
        box.classList.contains(
          role === astronautRole ? astronautClass : alienClass,
        ),
      );
    });
  }

  function endGame(result) {
    gameActive = false;
    nextRoundButton.disabled = false; // Enable the button when the game ends

    // Create an overlay div for the blurred background
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(2px);
        z-index: 999;
    `;
    document.body.appendChild(overlay);

    // Style the result message
    resultMessage.style.cssText = `
        display: block;
        position: fixed;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        font-size: 2.3rem;
        text-align: center;
        color: white;
        font-family: 'Poppins', sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 1rem;
        border-radius: 20px;
     

    `;

    // Style the result message
    subResultMsg.style.cssText = `
     display: block;
     position: fixed;
    
     left: 50%;
     transform: translate(-50%, -50%);
     z-index: 1000;
     font-size: 1.3rem;
     text-align: center;
     color: white;
     font-family: 'Poppins', sans-serif;
     font-weight: bold;
     background-color: rgba(0, 0, 0, 0.5);
     padding: 1rem;
     border-radius: 20px;
  

 `;

    if (result === 'draw') {
      resultMessage.innerHTML = 'Draw!';
      subResultMsg.innerHTML = `Click on Next Round to continue playing.`;
    } else {
      const winningRole = result === astronautRole ? 'Astronaut' : 'Alien';
      const winningClass =
        result === astronautRole ? astronautClass : alienClass;

      // Apply winning class
      winCombinations.forEach((combination) => {
        if (
          combination.every((index) =>
            boxes[index].classList.contains(winningClass),
          )
        ) {
          combination.forEach((index) => {
            boxes[index].classList.add(
              result === userRole ? 'userwon' : 'cpuwon',
            );
          });
        }
      });

      resultMessage.innerHTML = `${winningRole} wins the round!`;
      subResultMsg.innerHTML = `Click on the 'Next Round' button to continue playing.`;

      if (result === userRole) {
        playerScore.innerHTML = parseInt(playerScore.innerHTML || '0') + 10;
      } else {
        cpuScore.innerHTML = parseInt(cpuScore.innerHTML || '0') + 10;
      }
    }

    // Add a click event to remove the overlay and reset the game
    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resultMessage.style.display = 'none';
      subResultMsg.style.display = 'none';
    });
  }

  const MAX_CLASSLIST_SIZE = 1;

  function executeCpuTurn() {
    if (!gameActive) return;

    function getRandomBox() {
      return Math.floor(Math.random() * 9);
    }

    let box = null;
    let attempts = 0;
    const maxAttempts = 20;

    do {
      box = boxes[getRandomBox()];
      attempts++;
      if (attempts > maxAttempts) {
        console.log('No empty boxes found');
        return;
      }
    } while (box.classList.length > MAX_CLASSLIST_SIZE || box.innerHTML !== '');

    console.log(
      `(CPU) Found unoccupied box: ${Array.from(boxes).indexOf(box)}`,
    );

    // Fill the box with CPU's role immediately
    box.innerHTML =
      cpuRole === astronautRole
        ? '<img src="icons/astronaut.png" alt="Astronaut" style="width: 75px;" />'
        : '<img src="icons/alien.png" alt="Alien" style="width: 75px;" />';
    cpuGameplayClick.play();
    box.classList.add(cpuRole === astronautRole ? astronautClass : alienClass);

    // Add these styles to center the image

    box.style.justifyContent = 'center';
    box.style.alignItems = 'center';

    // Check for win condition or draw after a short delay
    setTimeout(() => {
      if (checkWin(cpuRole)) {
        endGame(cpuRole);
      } else if (checkDraw()) {
        endGame('draw');
      } else {
        isCpuTurn = false;
      }
    }, 200);
  }

  let round = 1;
  const roundNum = document.getElementById('round-num');

  nextRoundButton.addEventListener('click', () => {
    nextRound();
  });

  function nextRound() {
    Array.from(boxes).forEach((box) => {
      menuClickAudio.play();
      box.innerHTML = '';
      box.classList.remove('userwon', 'cpuwon', astronautClass, alienClass);
    });

    resultMessage.style.display = 'none';
    subResultMsg.style.display = 'none';

    round++;
    roundNum.innerText = round;

    gameActive = true;
    isCpuTurn = false;
    nextRoundButton.disabled = true; // Disable the button at the start of a new round
  }

  // Initial setup
  nextRoundButton.disabled = true;
});
