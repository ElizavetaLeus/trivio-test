const dictionaryWords = {
  'вариант': 'вариант|варианта|вариатов',
  'найден': 'Найден|Найдено|Найдено',
};
export const plural = (word: string, count: number) => {
  const dictionaryKey = word as keyof typeof dictionaryWords;
  if (!dictionaryWords[dictionaryKey]) {
    console.log('Такого слова нет в словаре');
    return;
  }
  const [one, few, many] = dictionaryWords[dictionaryKey].split('|');
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
