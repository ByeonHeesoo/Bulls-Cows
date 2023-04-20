export function generateRandomNumber() {

  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const pickedNumbers = shuffle(candidates).splice(0, 4); // 4자리 뽑기

  return pickedNumbers;
}

function shuffle(array) {
  // 랜덤숫자
  return array.sort(() => {
    return Math.random() - 0.5;
  })
}