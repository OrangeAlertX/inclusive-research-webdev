export default function assoc<K extends string, V>(key: K, value: V) {
  return <O extends object>(obj: O) =>
    ({
      ...obj,
      [key]: value,
    } as K extends keyof O ? Omit<O, K> & Record<K, V> : O & Record<K, V>);
}
