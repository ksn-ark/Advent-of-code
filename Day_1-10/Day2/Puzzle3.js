const fetchRawData = async () => {
  fetch("./Day2Data1.txt")
    .then((res) => res.text())
    .then((data) => interpretData(data));
};

const interpretData = (rawData) => {
  let gameArray = rawData.split("\r\n");
  const gameObjectsArray = gameArray.map((gameData) => ({
    game: defineGameObject(gameData),
  }));
  sumOfValidIds(gameObjectsArray);
};

const defineGameObject = (gameData) => {
  const gameObject = new Object();
  gameObject.gameId = gameData.split(":")[0].split(" ")[1];

  roundsArray = gameData.split(":")[1].split(";");

  gameObject.rounds = roundsArray.map((round) => {
    const roundObject = new Object();
    const ballCountArray = round.split(",");
    for (ballCount in ballCountArray) {
      ballArray = ballCountArray[ballCount].split(" ");
      ballColor = ballArray[2];
      ballCount = ballArray[1];
      Object.defineProperty(roundObject, `${ballColor}`, {
        value: ballCount,
      });
    }

    return roundObject;
  });

  return gameObject;
};

const gameLimiters = {
  red: 12,
  green: 13,
  blue: 14,
};

const sumOfValidIds = (gameObjectsArray) => {
  let sumofIds = 0;
  for (gameObjectId in gameObjectsArray) {
    game = gameObjectsArray[gameObjectId].game;
    flag = true;
    for (roundObjectId in game.rounds) {
      round = game.rounds[roundObjectId];
      if (
        round.green > gameLimiters.green ||
        round.red > gameLimiters.red ||
        round.blue > gameLimiters.blue
      ) {
        flag = false;
        break;
      }
    }
    if (flag) {
      sumofIds += parseInt(game.gameId);
    }
  }
  console.log(sumofIds);
};

fetchRawData();
