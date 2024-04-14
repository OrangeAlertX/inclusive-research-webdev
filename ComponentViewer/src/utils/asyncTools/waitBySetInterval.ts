export default async function waitBySetInterval(cb: () => any, time: number) {
  return new Promise((res, rej) => {
    const firstTry = cb();
    if (firstTry) res(firstTry);

    let count = 0;

    const intervalID = setInterval(() => {
      const isFinished = cb();
      if (!isFinished) {
        if (count++ > 50) rej(new Error('timeout'));
        return;
      }
      clearInterval(intervalID);
      res(isFinished);
    }, time);
  });
}
