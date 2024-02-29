export default function adjustFontSize(target) {
  target.addEventListener('resize', () => {
    const width = target.offsetWidth;
    const newFontSize = target.style.setProperty(
      'font-size',
      newFontSize + 'px'
    );
  });
}
