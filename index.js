const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `You awake on a beach with no recollection of how you got there.
  The sun beats down as the waves lap at your feet. To your immediate north, a boat rocks in the shallows. 
  To the south, the beach stretches on as far the eye can see.`
  >_;

  let answer = await ask(welcomeMessage);

  while (answer !== behavior.move || answer !== "some text to move story along")
  answer = await ask ("I don't know how to " + answer + "?");

  answer = await ask ("beach1 description");

  



  console.log("Now write your code to make this work!");
  process.exit();


while (answer !== "exit" || answer !== "some text to move story along")
  answer = await ask ("I don't know how to " + answer + "?");
}

class Rooms {
  constructor(description, inventory, [connectingRooms]) {
    this.description = description;
    this.inventory = inventory;
    this.connectingRooms = connectingRooms;
  }
}
let beach = new Room("someparagraoh", this.inventory, );

let behavior = {
  move: ['north', 'south', 'east', 'west'],
  go:   ['north', 'south', ' east', 'west'],
  head: ['north', 'south', 'east', 'west'],
  take: ['key', 'gas', 'torch', 'letter', 'telescope'],
  open: ['door', 'letter'],
  enter: ['cave', 'lighthouse', 'boat'],
  pickup: ['letter', 'gas', 'torch'],
  drop: ['key', 'gas', 'torch', 'letter', 'telescope'],
  inspect: ['skeleton'],



}

actionArr = [
  "move",
  "go",
  "take",
  "pickup",
  "read",
  "inspect",
  "open",
  "drop",
  "throw",
  "enter",
  "drive",
  "start",
  "turn",
];
itemArr = [
  "key",
  "gas",
  "torch",
  "skeleton",
  "telescope",
  "letter"
];
//Or what if we make an object of the actions and targets and use them as key value pairs??