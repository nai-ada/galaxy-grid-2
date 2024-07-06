document.addEventListener('DOMContentLoaded', function () {
  // Audio elements
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

  // Set initial mute state based on localStorage
  [lobbyMusic, menuClickAudio, roleClickAudio].forEach((audio) => {
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
