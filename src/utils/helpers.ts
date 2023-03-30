export const generateAsciiCharacters = (): string[] => {
  // Space
  const characters: string[] = [' '];
  
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
