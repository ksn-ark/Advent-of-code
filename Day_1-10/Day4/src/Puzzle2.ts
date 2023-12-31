const main = async (): Promise<void> => {
  const filePath = "./PuzzleInput.txt";
  const input = await fetchInput(filePath);
  const cards = inputHandler(input);
  const totalScratchCards: number = totalCardsCalculator(cards);
  console.log(totalScratchCards);
};

const totalCardsCalculator = (cards: Card[]): number => {
  cards.forEach((card) => {
    let matchingNumbers = 0;
    card.winningNumbers.forEach((winningNumber: number) => {
      if (card.cardNumbers.has(winningNumber)) {
        matchingNumbers += 1;
      }
    });

    cards.map((duplicateCard) => {
      if (
        card.id < duplicateCard.id &&
        duplicateCard.id <= card.id + matchingNumbers
      ) {
        duplicateCard.cardCount += card.cardCount;
      }
    });
  });

  return cards.reduce((cardSum, cardNum) => cardSum + cardNum.cardCount, 0);
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
  winningNumbers: Set<number>;
  cardNumbers: Set<number>;
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
  winningNumbers: Set<number>;
  cardNumbers: Set<number>;
}

main();
