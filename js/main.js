let playerName = '';
let shuffledPuzzles = [];
let currentPuzzleIndex = 0;
let startTime;
let totalHintCount = 0;

// 스토리 시나리오
const storyTexts = [
  '당신은 숲속에서 길을 잃었습니다.',
  '저기 오두막이 있는데?',
  '문을 열었더니 이상한 쪽지가 놓여져있다.'
];
let storyIndex = 0;

function startGame() {
  const nameInput = document.getElementById('username').value.trim();
  if (!nameInput) return alert('이름을 입력하세요.');

  playerName = nameInput;
  startTime = Date.now();
  shuffledPuzzles = shuffleArray([0, 1, 2, 3, 4]);
  currentPuzzleIndex = 0;

  // 이름 입력창 숨기고 스토리 시작
  document.getElementById('intro').style.display = 'none';
  document.getElementById('story').style.display = 'block';
  document.getElementById('story-text').textContent = storyTexts[storyIndex];
}

function nextStory() {
  storyIndex++;
  if (storyIndex < storyTexts.length) {
    document.getElementById('story-text').textContent = storyTexts[storyIndex];
  } else {
    document.getElementById('story').style.display = 'none';
    showPuzzle(currentPuzzleIndex);
  }
}

function showPuzzle(index) {
  document.querySelectorAll('.puzzle').forEach(p => p.style.display = 'none');
  document.getElementById('puzzle-container').style.display = 'block';
  loadPuzzle(shuffledPuzzles[index]);
}

function nextPuzzle() {
  currentPuzzleIndex++;
  if (currentPuzzleIndex >= shuffledPuzzles.length) {
    showEnding();
  } else {
    showPuzzle(currentPuzzleIndex);
  }
}

function showEnding() {
  const endTime = Date.now();
  const duration = Math.floor((endTime - startTime) / 1000);

  const params = new URLSearchParams({
    name: playerName,
    time: duration,
    hint: totalHintCount,
  });

  document.getElementById('puzzle-container').style.display = 'none';
  document.getElementById('ending').style.display = 'block';
  document.getElementById('ending-text').innerHTML = `
    <p>${playerName}님, 당신은 모두의 기대를 저버리지 않았습니다.</p>
    <p>모든 퀴즈를 풀고 마침내 이 방을 탈출했습니다.</p>
    <p><strong>결과 링크:</strong></p>
    <textarea style="width:100%;height:80px;">result.html?${params.toString()}</textarea>
  `;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
