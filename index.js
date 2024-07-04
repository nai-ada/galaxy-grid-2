document.addEventListener('DOMContentLoaded', function () {
  let lobbyMusic = document.getElementById('lobby-audio');

  // Set initial volume
  lobbyMusic.volume = 0.5;

  const mutedButton = document.getElementById('muted-button');
  const unmutedButton = document.getElementById('unmuted-button');

  // Check localStorage for mute state
  const isMuted = localStorage.getItem('isMuted') === 'true';

  // Set initial mute state based on localStorage
  lobbyMusic.muted = isMuted;
  if (isMuted) {
    unmutedButton.style.display = 'none';
    mutedButton.style.display = 'block';
  } else {
    unmutedButton.style.display = 'block';
    mutedButton.style.display = 'none';
  }

  function toggleMute() {
    if (lobbyMusic.muted) {
      lobbyMusic.muted = false;
      unmutedButton.style.display = 'block';
      mutedButton.style.display = 'none';
      localStorage.setItem('isMuted', 'false'); // Save state to localStorage
      console.log('sound is playing!');
    } else {
      lobbyMusic.muted = true;
      unmutedButton.style.display = 'none';
      mutedButton.style.display = 'block';
      localStorage.setItem('isMuted', 'true'); // Save state to localStorage
      console.log('no sound is playing!');
    }
  }

  mutedButton.addEventListener('click', toggleMute);
  unmutedButton.addEventListener('click', toggleMute);

  // Navigation logic
  const startButton = document.getElementById('start-button');
  const astronautRole = document.getElementById('astronaut-role');
  const spaceshipRole = document.getElementById('spaceship-role');

  startButton.addEventListener('click', function () {
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('selection-section').style.display = 'block';
  });

  astronautRole.addEventListener('click', function () {
    document.getElementById('selection-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
  });

  spaceshipRole.addEventListener('click', function () {
    document.getElementById('selection-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
  });
});

// for menu button sound effect
let menuClickAudio = document.getElementById('menu-click-audio');
menuClickAudio.volume = 0.4;
document.getElementById('start-button').addEventListener('click', function () {
  menuClickAudio.play();
});

// role selection sound effects
let roleClickAudio = document.getElementById('role-click-audio');
roleClickAudio.volume = 0.3;
document
  .getElementById('astronaut-role') // i am aware that this is redundant as I already declared a variable above, but it doesnt work for some reason.
  .addEventListener('click', function () {
    roleClickAudio.play();
  });
document
  .getElementById('spaceship-role')
  .addEventListener('click', function () {
    roleClickAudio.play();
  });
