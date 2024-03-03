export default function openCloseDifficulties(diffs) {
  const className = diffs[0].classList[0];
  const curDiffAvailable = +localStorage.getItem('curDiffAvailable') || 1;
  for (let i = 0; i < Math.min(curDiffAvailable, diffs.length); i++) {
    diffs[i].classList.remove(className + '--disabled');
  }
  for (let i = curDiffAvailable; i < diffs.length; i++) {
    diffs[i].classList.add(className + '--disabled');
  }
}
