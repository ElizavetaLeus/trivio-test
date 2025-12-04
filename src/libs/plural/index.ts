const dictionaryWords = {
  'вариант': 'вариант|варианта|вариатов',
  'найден': 'найден|найдено|найдено',
};
export const plural = (key: keyof typeof dictionaryWords, count: number) => {
  if (!dictionaryWords[key]) {
    console.error('Такого слова нет в словаре');
    return;
  }
  const [one, few, many] = dictionaryWords[key].split('|');
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return many;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }
  if (mod10 === 1) {
    return one;
  }
  return many;
};
