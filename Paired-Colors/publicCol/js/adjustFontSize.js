export default function adjustFontSize(target) {
  // 20px on 1000px for desktop, and two times for mobile;
  const FONT_SIZE_ON_ONE_PX = 0.02;
  //
  resizer();
  addEventListener('resize', resizer);

  function resizer() {
    const width = target.offsetWidth;
    const height = target.offsetHeight;
    const isMobile = height / width > 1.25;

    const newFontSize = isMobile
      ? width * FONT_SIZE_ON_ONE_PX * 2.15
      : width * FONT_SIZE_ON_ONE_PX;

    target.style.setProperty('font-size', newFontSize + 'px');
  }
}
