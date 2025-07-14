const puzzles = [
    {
      move: '이곳으로 이동하세요' ,
      moveImage: `img/place1.jpg`,
      question: '문제 1: 문을 여는 숫자는?',
      answer: '1234',
      hints: ['네 자리 숫자입니다.', '1로 시작합니다.']
    },
    {
      move: '이곳으로 이동하세요' ,
      moveImage: `img/place2.jpg`,
      question: '문제 2: 탈출구 방향은?',
      answer: '동쪽',
      hints: ['해가 뜨는 쪽입니다.', '왼쪽이 아닙니다.']
    },
    {
      move: '이곳으로 이동하세요' ,
      moveImage: `img/place3.jpg`,
      question: '문제 3: 방 안에 있는 것은?',
      answer: '열쇠',
      hints: ['잠긴 것을 여는 도구입니다.', '쇠로 만들어졌습니다.']
    },
    {
      move: '이곳으로 이동하세요' ,
      moveImage: `img/place2.jpg`,
      question: '문제 4: 주인공의 이름은?',
      answer: '홍길동',
      hints: ['고전 소설 속 인물입니다.', '이름에 "동"이 들어갑니다.']
    },
    {
      move: '이곳으로 이동하세요' ,
      moveImage: `img/place2.jpg`,
      question: '문제 5: 게임의 제목은?',
      answer: '방탈출',
      hints: ['방에서 빠져나가는 게임입니다.', '네 글자입니다.']
    }
  ];
  
  let hintShown = 0;

  function loadMove(index) {
    const puzzle = puzzles[index];
    hintShown = 0;
    document.getElementById('move-text').textContent = puzzle.move;
    document.getElementById('move-image').src = puzzle.moveImage;
  }
  
  function loadPuzzle(index) {
    const puzzle = puzzles[index];
    hintShown = 0;
    document.getElementById('question').textContent = puzzle.question;
    document.getElementById('user-answer').value = '';
    document.getElementById('hint-box').textContent = '';
    document.getElementById('hint-button').disabled = false;
  }
  
  function checkAnswer() {
    const userInput = document.getElementById('user-answer').value.trim();
    const puzzle = puzzles[shuffled[currentPuzzleIndex]];
    if (userInput === puzzle.answer) {
      alert('정답입니다!');
      nextMove();
    } else {
      alert('틀렸습니다. 다시 시도하세요.');
    }
  }
  
  function showHint() {
    const puzzle = puzzles[shuffled[currentPuzzleIndex]];
    if (hintShown < puzzle.hints.length) {
      document.getElementById('hint-box').textContent = puzzle.hints[hintShown];
      hintShown++;
      totalHintCount++;
      saveGameState(); // ✅ 힌트 사용 후 저장
      if (hintShown >= puzzle.hints.length) {
        document.getElementById('hint-button').disabled = true;
      }
    }
  }

  