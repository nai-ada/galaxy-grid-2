document.addEventListener('DOMContentLoaded', function () {
  // adding audio elements
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
  let astronautRole = document.getElementById('astronaut-role');
  let spaceshipRole = document.getElementById('spaceship-role');
  const nextRoundButton = document.getElementById('next-round-button'); // Renamed variable

  startButton.addEventListener('click', function () {
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('selection-section').style.display = 'block';
    menuClickAudio.play();
  });

  let userRole = '';
  let cpuRole = '';

  astronautRole.addEventListener('click', function () {
    document.getElementById('selection-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    roleClickAudio.play();

    userRole = astronautRole;
    cpuRole = spaceshipRole;
  });

  spaceshipRole.addEventListener('click', function () {
    document.getElementById('selection-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    roleClickAudio.play();

    userRole = spaceshipRole;
    cpuRole = astronautRole;
  });

  // role selector logic

  isAstronautRoleClicked = false;
  isSpaceshipRoleClicked = false;

  astronautRole.addEventListener('click', () => {
    if ((astronautRole = 'clicked')) {
      isAstronautRoleClicked = true;
      userRole = astronautRole;
      cpuRole = spaceshipRole;
      console.log('Astronaut role clicked');
    }
  });

  spaceshipRole.addEventListener('click', () => {
    if ((spaceshipRole = 'clicked')) {
      isSpaceshipRoleClicked = true;
      userRole = spaceshipRole;
      cpuRole = astronautRole;
      console.log('Spaceship role clicked');
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
  const spaceshipClass = 'spaceship';
  const astronautClass = 'astronaut';

  // converting the tds into an array and checking to see when each box is clicked
  Array.from(boxes).forEach((box, index) => {
    box.addEventListener('click', (e) => {
      console.log(`box ${index} clicked`);
      // applying a role to a box when clicked
      let roleFillBox = (box.innerHTML =
        userRole === astronautRole
          ? '<img src="icons/astronaut.svg" alt="Astronaut" style="width: 75px;" />'
          : '<img src="icons/spaceship.svg" alt="Spaceship" style="width: 75px;" />');

      // adding a class to each box in correspondence to each role
      if (userRole === astronautRole) {
        box.classList.add(astronautClass);
      } else {
        box.classList.add(spaceshipClass);
      }

      // Check for winning combinations
      winCombinations.forEach((combination) => {
        const boxesInCombination = combination.map((i) => boxes[i]);
        const allSameClass =
          boxesInCombination.every((box) =>
            box.classList.contains(spaceshipClass),
          ) ||
          boxesInCombination.every((box) =>
            box.classList.contains(astronautClass),
          );

        if (allSameClass) {
          // Apply winning class styles
          combination.forEach((i) => boxes[i].classList.add('won'));

          // Ensure styles are applied before alert
          setTimeout(() => {
            // Determine the winning role and display the alert
            const winningRole = boxesInCombination[0].classList.contains(
              astronautClass,
              roleFillBox,
            )
              ? 'Astronaut'
              : 'Spaceship';
            alert(`The winner is ${winningRole}! Winner gets +10 points!`);
          }, 200);
        }
      });
    });
  });
});
