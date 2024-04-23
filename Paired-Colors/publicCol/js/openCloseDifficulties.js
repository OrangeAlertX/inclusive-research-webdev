let storageListener = false;

export default function openCloseDifficulties(diffs) {
  const className = diffs[0].classList[0];
  let curDiffAvailable = +localStorage.getItem('curDiffAvailable');
  if (!curDiffAvailable) {
    curDiffAvailable = 1;
    localStorage.setItem('curDiffAvailable', '1');
  }
  for (let i = 0; i < Math.min(curDiffAvailable, diffs.length); i++) {
    diffs[i].classList.remove(className + '--disabled');
  }
  for (let i = curDiffAvailable; i < diffs.length; i++) {
    diffs[i].classList.add(className + '--disabled');
  }

  if (!storageListener) {
    storageListener = true;
    window.addEventListener('storage', () => {
      const event = new Event('storageUpdated');
      event.key = 'curDiffAvailable';
      event.value = curDiffAvailable;

      window.dispatchEvent(event);

      openCloseDifficulties(diffs);
    });
  }
}
