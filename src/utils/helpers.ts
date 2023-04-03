let characters: string[] = [];

export const generateAsciiCharacters = (): string[] => {
  if (characters.length) return characters;

  // Space
  characters = [" "];

  // A-Z
  for (let i = 65; i <= 90; i++) {
    characters.push(String.fromCharCode(i));
  }

  // a-z
  for (let i = 97; i <= 122; i++) {
    characters.push(String.fromCharCode(i));
  }
  return characters;
};

export const checkForValidCharacters = (phrase: string) => {
  // Regex to check Uppercase, Lowercase and Spaces
  const regex = /^[A-Za-z ]+$/;
  return regex.test(phrase);
};

export const randomInt = (limit: number) => {
  return Math.floor(Math.random() * limit);
};

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
