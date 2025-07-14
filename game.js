let startTime, hintCount = 0;

function startGame() {
  const name = document.getElementById('username').value;
  if (!name) return alert('이름을 입력하세요.');
  startTime = Date.now();
  document.getElementById('game').style.display = 'block';
}

function useHint() {
  hintCount++;
  alert(`힌트를 사용했습니다! (총 ${hintCount}회)`);
}

function endGame() {
  const endTime = Date.now();
  const duration = Math.floor((endTime - startTime) / 1000);
  const name = document.getElementById('username').value;
  const answer = document.getElementById('answer').value;

  if (answer !== '열쇠') {
    return alert('정답이 아닙니다! 다시 시도하세요.');
  }

  const params = new URLSearchParams({
    name: name,
    time: duration,
    hint: hintCount,
  });

  window.location.href = `result.html?${params.toString()}`;
}
