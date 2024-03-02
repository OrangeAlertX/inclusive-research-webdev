export default function openCloseDifficulties(diffs) {
  const className = diffs[0].classList[0];
  console.log(className);
  for (let i = 1; i < diffs.length; i++) {
    diffs[i].classList.add(className + '--disabled');
  }
}
