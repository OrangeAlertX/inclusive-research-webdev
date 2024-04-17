export default function debounce(func, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(args);
    }, delay);

    return timeoutId;
  };
}
