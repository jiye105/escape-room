let playerName = '';
let shuffled = [];
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
  shuffled = shuffleArray([0, 1, 2, 3, 4]);
  currentPuzzleIndex = 0;

  // 이름 입력창 숨기고 스토리 시작
  document.getElementById('intro').style.display = 'none';
  document.getElementById('story').style.display = 'block';
  document.getElementById('story-text').textContent = storyTexts[storyIndex];
}

function resetGame() {
    localStorage.removeItem('escapeGameState');
    location.reload();
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


// const gameSteps = [{ type: 'intro' }];
// shuffled.forEach(index => {
//   gameSteps.push({
//     type: 'move',
//     puzzleIndex: index,
//     image: `img/place${index + 1}.jpg`,
//     text: `다음 장소로 이동해보자!`
//   });
//   gameSteps.push({
//     type: 'puzzle',
//     puzzleIndex: index
//   });
// });
// gameSteps.push({ type: 'ending' });
// console.log(gameSteps);

// function nextStep() {
//     const current = gameSteps.stepIndex;
//     document.getElementById('move').style.display = 'none';
//     document.getElementById('puzzle-container').style.display = 'none';
//     document.getElementById('intro').style.display = 'none';
  
//     if (!current) {
//       showEnding();
//       return;
//     }
  
//     if (current.type === 'intro') {
//       document.getElementById('intro').style.display = 'block';
//     } else if (current.type === 'move') {
//       document.getElementById('move-text').textContent = current.text;
//       document.getElementById('move-image').src = current.image;
//       document.getElementById('move').style.display = 'block';
//     } else if (current.type === 'puzzle') {
//       loadPuzzle(current.puzzleIndex);
//       document.getElementById('puzzle-container').style.display = 'block';
//     }
  
//     stepIndex++;
//     saveGameState();
//   }
  

function showMove(index) {
    document.getElementById('move-container').style.display = 'block';
    document.getElementById('puzzle-container').style.display = 'none';
    loadMove(shuffled[index]);
  }

function showPuzzle(index) {
  document.querySelectorAll('.puzzle').forEach(p => p.style.display = 'none');
  document.getElementById('move-container').style.display = 'none';
  document.getElementById('puzzle-container').style.display = 'block';
  loadPuzzle(shuffled[index]);
}

function nextMove() {
    saveGameState(); // ✅ 진행 상태 저장
    if (currentPuzzleIndex >= shuffled.length) {
      showEnding();
    } else {
      showMove(currentPuzzleIndex);
    }
  }

function nextPuzzle() {
    currentPuzzleIndex++;
    saveGameState(); // ✅ 진행 상태 저장
    if (currentPuzzleIndex >= shuffled.length) {
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
    time: btoa(duration.toString()),          // ← Base64 인코딩
    hint: btoa(totalHintCount.toString()),    // ← Base64 인코딩
  });
  // ✅ 모든 다른 화면 숨기기
  document.getElementById('intro').style.display = 'none';
  document.getElementById('story').style.display = 'none';
  document.getElementById('puzzle-container').style.display = 'none';

  document.getElementById('ending').style.display = 'block';
  document.getElementById('ending-text').innerHTML = `
    <p>${playerName}님, 당신은 모두의 기대를 저버리지 않았습니다.</p>
    <p>모든 퀴즈를 풀고 마침내 이 방을 탈출했습니다.</p>
    <p><strong>결과 링크:</strong></p>
    <textarea style="width:100%;height:30px;">result.html?${params.toString()}</textarea>
  `;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function saveGameState() {
    const state = {
      name: playerName,
      startTime,
      shuffled,
      currentPuzzleIndex,
      totalHintCount,
      isCompleted: (currentPuzzleIndex >= shuffled.length),
    };
    localStorage.setItem('escapeGameState', JSON.stringify(state));
  }
  
  function loadGameState() {
    const saved = localStorage.getItem('escapeGameState');
    if (saved) {
      const state = JSON.parse(saved);
      playerName = state.name;
      startTime = state.startTime;
      shuffled = state.shuffled;
      currentPuzzleIndex = state.currentPuzzleIndex;
      totalHintCount = state.totalHintCount;
      return state.isCompleted ? 'completed' : true;
    }
    return false;
  }
  
  
  window.onload = function () {
    const result = loadGameState();
  
    if (result === 'completed') {
      showEnding(); // ✅ 이제 playerName 등도 정상 할당돼서 문제 없음
    } else if (result === true) {
      document.getElementById('intro').style.display = 'none';
      showPuzzle(currentPuzzleIndex);
    } else {
      // 아무것도 없는 상태일 때는 intro 화면 그대로 둠
      console.log('새로운 사용자입니다.');
    }
  };
      