const params = new URLSearchParams(window.location.search);
const name = params.get('name');
const time = params.get('time');
const hint = params.get('hint');

if (name && time) {
  document.getElementById('result').innerHTML = `
    <h2>🎉 ${name}님 탈출 성공!</h2>
    <p>⏱️ 걸린 시간: ${time}초</p>
    <p>💡 힌트 사용: ${hint}회</p>
  `;
} else {
  document.getElementById('result').textContent = '잘못된 접근입니다.';
}
