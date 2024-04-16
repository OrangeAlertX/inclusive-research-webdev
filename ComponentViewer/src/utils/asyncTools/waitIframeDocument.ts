import waitBySetInterval from './waitBySetInterval';

export default function waitIframeDocument(
  iframe: HTMLIFrameElement,
  instance: { isActual: boolean },
  time: number
) {
  instance.isActual = true;

  return waitBySetInterval(() => {
    if (!instance.isActual) return true;
    const iframeWindow = iframe.contentDocument;
    console.log(iframeWindow.location);
    if (iframeWindow.location.origin !== 'null') {
      return iframeWindow;
    }
  }, time) as Promise<Document | true>;
}
