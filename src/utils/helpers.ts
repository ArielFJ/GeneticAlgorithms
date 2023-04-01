let characters: string[] = [];

export const generateAsciiCharacters = (): string[] => {
  if (characters.length > 0) return characters;

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

export const random = (limit: number) => {
  return Math.floor(Math.random() * limit);
};
