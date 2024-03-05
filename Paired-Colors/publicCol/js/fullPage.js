export default function fullPage(target) {
  let event = false;
  const clickCB = (e) => {
    const path = e.composedPath();

    if (document.fullscreenElement) return;

    if (path.length > 8) {
      document.body.requestFullscreen();
    }
  };
  const resizeCB = () => {
    if (isMobile()) {
      if (event) return;
      target.addEventListener('click', clickCB);
      event = true;
    } else {
      if (event) target.removeEventListener('click', clickCB);
      event = false;
    }
  };
  addEventListener('resize', resizeCB);
  resizeCB();

  function isMobile() {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        )
      )
        check = true;
    })(navigator.userAgent || window.opera);
    return check;
  }
}
