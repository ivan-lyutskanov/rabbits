  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const rabbits = document.querySelectorAll('.rabbit');
  const playBtn = document.getElementById('play-btn');
  let lastHole;
  let timeUp = false;
  let score = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) return randomHole(holes);
    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function startGame(duration = 10000) {
    playBtn.classList.remove('show');
    playBtn.classList.add('hide');
    scoreBoard.parentElement.classList.add('show');
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {timeUp = true;showPlayBtn();}, duration);
  }

  function showPlayBtn(){
    playBtn.innerHTML = 'Play again?'
    playBtn.classList.remove('hide');
    playBtn.classList.add('show');
  }

  function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.classList.add('freeze');
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

  rabbits.forEach(rabbit => {
    rabbit.addEventListener('click', bonk);
    rabbit.addEventListener('transitionend', (e) => e.target.classList.remove('freeze'));
  });
