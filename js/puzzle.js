const puzzles = [
    {
      move: `내 자리 어디에 떨어져있는건 아니겠지?? ` ,
      moveImage: `https://m.tsfurniture.co.kr/web/product/big/202407/5d4bf51673821a13732320b936a0c98a.jpg`,
      question: '모자이크 상품화품질그룹 DOCS에 가보자.\n그룹행사 > 사무실탈출_2508 폴더를 열어보니... \n파일이 많다.',
      // clueImage: 'C:/Users/jiye105.shin/Desktop/escape_room/escape-room/clue.JPG',
      answer: '개발품질점검회의메모',
      hints: ['파일 확장자가 다양하네요.', '모든 파일이 가리키는 하나의 파일이 있습니다.']
    },
    {
      move: `설마 어제 그룹장님 자리에서 \n뭐 말씀드리다가 두고왔나?` ,
      moveImage: `https://cdn.koit.co.kr/news/photo/202411/126963_79771_1827.jpg`,
      question: '그룹장님 이름표가 좀 이상하네?',
      // clueImage: "",
      answer: '85136166',
      hints: ['정답을 숫자로 작성해 주세요.', '그룹장님이 화학을 전공하셨었나?']
    },
    {
      move: '어제 새로 생긴 시작실에 \n시료도 옮겨뒀는데.. 설마 거기에?' ,
      moveImage: `https://www.hyundai.co.kr/image/upload/asset_library/MDA00000000000054162/de88a9de0c014d6f902cd9b776201618.jpg`,
      question: '시작실로 가보자',
      // clueImage: "",
      answer: '171212',
      hints: ['영어를 숫자로 바꿔보자.', 'J=10']
    },
    {
      move: '아참, 어제 휴게실에서 \n책도 한권 빌려갔었어' ,
      moveImage: `https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/d206/c6ba369cada786ff11d185ad4324288dfaa46bc7eef880718cb46a73e6c3.jpg`,
      question: '김승태 프로가 빌려간 책이 뭐지..?',
      // clueImage: "",
      answer: 'pvr',
      hints: ['도서 장부를 확인해보세요.', '맥친지식 사고와 기술을 찾으세요.']
    },
    {
      move: '프린터기에서 복사도 \n한번 했었는데...' ,
      moveImage: `https://cdn.kbanker.co.kr/news/photo/202002/89167_37060_36.jpg`,
      question: '누가 복사를 하다 말았네?',
      // clueImage: "",
      answer: 'gcs',
      hints: ['종이를 이리저리 돌려보세요.', '세글자입니다.']
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
    const clueImg = document.getElementById("clue-image")
    if (puzzle.clueImage ) {
      console.log("이미지 로딩:", puzzle.clueImage);
      clueImg.src = puzzle.clueImage;
      clueImg.style.display = "block";
    } else {
      clueImg.style.display = "none";
    }
    // document.getElementById("clue-image").src = puzzle.clueImage;
    // document.getElementById("clue-image").style.display = "block";
    // console.log('puzzle image:');
  }
  
  
  function checkAnswer() {
    const userInput = document.getElementById('user-answer').value.trim();
    const puzzle = puzzles[shuffled[currentPuzzleIndex]];
    if (userInput === puzzle.answer) {
        showMessage("🎉 정답입니다! 🎉", true, () => {
            nextMove(); // 2초 후 실행
          });

      } else {
        showMessage(`❌ 틀렸습니다 ❌\n다시 시도해보세요.`, false);
      }
  }
  
  function showHint() {
    const puzzle = puzzles[shuffled[currentPuzzleIndex]];
    const hintBox = document.getElementById('hint-box');
    if (hintShown < puzzle.hints.length) {
      const newHint = document.createElement('p');
      newHint.textContent = `힌트 ${hintShown + 1}: ${puzzle.hints[hintShown]}`;
      hintBox.appendChild(newHint);
      
      hintShown++;
      totalHintCount++;
      saveGameState(); // ✅ 힌트 사용 후 저장
      if (hintShown >= puzzle.hints.length) {
        document.getElementById('hint-button').disabled = true;
      }
    }
  }

  
