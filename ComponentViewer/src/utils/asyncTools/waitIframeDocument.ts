import waitBySetInterval from './waitBySetInterval';

/**
 * Only for iframe through src. Not for react portals.
 */
export default function waitIframeDocument(
  iframe: HTMLIFrameElement,
  instance: { isActual: boolean },
  time: number
) {
  instance.isActual = true;

  return waitBySetInterval<Document>(() => {
    if (!instance.isActual) return true;

    const iframeWindow = iframe.contentDocument;
    const body = JSON.stringify(iframeWindow.body);
    if (body !== 'null' && iframeWindow.location.origin !== 'null') {
      return iframeWindow;
    }
    return false;
  }, time);
}
