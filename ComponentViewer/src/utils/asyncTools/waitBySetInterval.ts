export default async function waitBySetInterval(cb: () => any, time: number) {
  return new Promise((res) => {
    const firstTry = cb();
    if (firstTry) res(firstTry);

    const intervalID = setInterval(() => {
      const isFinished = cb();
      if (!isFinished) return;

      clearInterval(intervalID);
      res(isFinished);
    }, time);
  });
}
