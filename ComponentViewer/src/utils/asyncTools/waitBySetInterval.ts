type cbReturn<U> = () => U | boolean;
export type FunctionSignature<T extends (...a: any) => any> = {} & ((
  ...a: Parameters<T>
) => ReturnType<T>);

export default async function waitBySetInterval<T>(
  cb: FunctionSignature<cbReturn<T>>,
  time: number
): Promise<ReturnType<typeof cb>> {
  return new Promise((res, rej) => {
    const firstTry = cb();
    if (firstTry) {
      res(firstTry);
      return;
    }

    let count = 0;

    const intervalID = setInterval(() => {
      const isFinished = cb();
      if (isFinished) {
        clearInterval(intervalID);
        res(isFinished);
        return;
      }

      if (count++ > 50) rej(new Error('timeout'));
    }, time);
  });
}
