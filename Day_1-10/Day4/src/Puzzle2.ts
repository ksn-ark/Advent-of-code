const main = async (): Promise<void> => {
  const filePath = "./PuzzleInput.txt";
  const input = await fetchInput(filePath);
  const cards = inputHandler(input);
  const totalScratchCards: number = totalCardsCalculator(cards);
  console.log(totalScratchCards);
  console.log(cards)
};

const totalCardsCalculator = (cards: Card[]): number => {
  let totalScratchCards = 0;
  cards.map((card) => {
    let matchingNumbers = 0;
    card.winningNumbers.forEach((winningNumber: number) => {
      if (card.cardNumbers.has(winningNumber)) {
        matchingNumbers += 1;
      }
    });
    cards.map(incard => {
      if (card.id < incard.id && incard.id <= card.id+matchingNumbers) {
        incard.cardCount+=card.cardCount
      } else {
        return;
      }
    })
  });
  cards.map((card) => (totalScratchCards += card.cardCount));
  return totalScratchCards;
};

const fetchInput = async (filePath: string): Promise<string> => {
  const response = await fetch(filePath);
  const inputData = await response.text();
  return inputData;
};

const inputHandler = (inputCards: string): Card[] => {
  const rawCards: string[] = inputCards.split("\n");
  const cards: Card[] = rawCards.map((rawCard: string) => new Card(rawCard));
  return cards;
};

class Card {
  id: number;
  winningNumbers: Set<any>;
  cardNumbers: Set<any>;
  cardCount: number;

  constructor(rawCard: string) {
    const sections: string[] = rawCard.split(":");
    this.id = parseInt(sections[0].split(/ +/)[1]);

    [this.winningNumbers, this.cardNumbers] = sections[1].split("| ", 2).map(
      (numbers: string) =>
        new Set(
          numbers
            .trim()
            .split(/ +/)
            .map((number: string) => parseInt(number))
        )
    );

    this.cardCount = 1;
  }
}

interface Card {
  id: number;
  winningNumbers: Set<any>;
  cardNumbers: Set<any>;
}

main();
