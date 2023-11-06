// this is solution for interactive svg, but for frontpage needed inline svg
// but i can't delete this, it's was HARD to find
// just leave it here...

(function () {
  let svgs = document.body.getElementsByTagName('object');

  for (const svg of svgs) {
    svg.addEventListener('load', () => {
      let svgDoc = svg.contentDocument;
      let svgTarget = svgDoc.getElementsByTagName('svg')[0];

      svgTarget.setAttribute(
        'class',
        `${svg.parentNode.getAttribute('class').split(' ')[0]}--svg`
      );
    });
  }
})();
