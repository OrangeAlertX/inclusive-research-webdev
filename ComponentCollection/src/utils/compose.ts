export default function compose<C>(...fns: Function[]) {
  return <U>(init: any): C => fns.reduceRight((acc, fn) => fn(acc), init);
}
