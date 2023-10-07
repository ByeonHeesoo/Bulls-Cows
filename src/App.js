import { useState, useEffect } from 'react';
import './App.css';
import { generateRandomNumber } from './random';
import Logs from './Logs';

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState('');
  const [logs, setLogs] = useState([]);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    console.log(randomNumber);
  }, [randomNumber]);

  // 사용자 입력 받기
  const handleAnswerChanged = (event) => {
    setAnswer(event.target.value);
  }

  // 랜덤 숫자와 입력한 답 맞춰보기
  const handleSubmit = (e) => {
    
    e.preventDefault();

    const answers = answer.split('').map(item => Number(item)); // 입력한 숫자를 배열로 바꾸기

    //숫자가 아닌 값을 입력했을 때
    if (answers.some(number => isNaN(number))) {
      alert('숫자만 입력해주세요');
      return;
    }

    // 4자리가 아닌 숫자값을 입력했을 때
    if (answers.length !== 4) {
      alert('4자리 숫자만 가능합니다!');
      return;
    }

    // 중복값을 입력했을 때

    const isDuplicate = answers.some((number) => {
      return answers.indexOf(number) !== answers.lastIndexOf(number);
    });
    // [1,2,3,4]에서 1의 인덱스번호
    // 앞에서부터 탐색하면 0번, 뒤에서부터 탐색했을때도 0번
    // [1,1,2,3]에서 1의 인덱스번호
    // 앞에서부터 탐색하면 0번, 뒤에서부터 탐색하면 1번 ===> 이것을 이용하여 중복성 검사

    if (isDuplicate) {
      alert('입력값은 중복이 없도록 해주세요~');
      return;
    }

    const { strike, ball } = randomNumber.reduce((prev, cur, index) => {
      // 스트라이크, 볼, 정답 유무
      if (answers[index] === cur) {
        return {
          ...prev,
          strike: prev.strike + 1,
        }
      }
      if (answers.includes(cur)) {
        return {
          ...prev,
          ball: prev.ball + 1,
        }
      }

      return prev;
    }, {
      strike: 0,
      ball: 0,
    });

    if (strike === 4) {
      alert('축하합니다 정답입니다!! 😊');
      setLogs([...logs, `${answer} 축하합니다 정답입니다!! 😊`]);
      setSuccess(true);
      return;
    }

    // 기록 남기기
    setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`]);
  }

  // 게임 초기화
  const handleRetry = () => {
    setRandomNumber(generateRandomNumber);
    setAnswer('');
    setLogs([]);
    setSuccess(false);
  }

  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className='header'>{
        isSuccess ? `정답 : ${answer}` : '----'
      }
      </header>
      <form onSubmit={handleSubmit}>
        <section>
          <input type='text' value={answer} onChange={handleAnswerChanged} disabled={isSuccess} />
          {
            isSuccess ? (
              <button onClick={handleRetry}>다시하기</button>
            ) : (
              <button onClick={handleSubmit}>맞춰보기</button>
            )
          }
        </section>
      </form>
      <Logs logs={logs} />
    </div>
  );
}

export default App;
