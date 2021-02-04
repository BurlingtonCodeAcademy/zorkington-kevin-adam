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
  const welcomeMessage =
    `You wake up on a small fishing boat that has landed upon a beach. You have no recollection of how you got there. 
  Cliffs rise a hundred feet from the sand in front of you to the east. To the north and west there is only open ocean. 
  The beach stretches to the south as far as the eye can see. There are keys in the ignition.`
  >_;

  let answer = await ask(welcomeMessage);

  while (answer !== behavior.move || answer !== "some text to move story along")
    answer = await ask("I don't know how to " + answer + "?");

  answer = await ask("beach1 description");

  console.log("Now write your code to make this work!");
  process.exit();

  while (answer !== "exit" || answer !== "some text to move story along")
    answer = await ask("I don't know how to " + answer + "?");
}

class Room {
  constructor(description, inventory, [connectingRooms]) {
    this.description = description;
    this.inventory = inventory;
    this.connectingRooms = connectingRooms;
  }
}

let boat = new Room(
  "An old fishing boat, worn but in working condition. There are keys in the ignition. It feels familiar, but you are sure you have never been here before.",
  [key],
  [beach1]
);
let beach1 = new Room("On this desolate patch of sand, there is a large, decrepit lighthouse on a small peninsula that juts into the ocean to the west . The door is sturdy and the handle is old and rusted. The cliffs to the east remain. The mysterious boat remains to the north. The beach continues to the south.", [], [boat, lightouse, beach2] );
let lighthouse = new Room("The heavy door of the lighthouse creeks open. Beams of light shine in through the windows, catching the dust suspended in the air. The stairs that circle the inside walls of the lighthouse are crumbled, leaving the upper levels inaccessible. You wouldn’t climb them if you could. The smell of gasoline wafts from a large can in the room." [can], [beach1]);
let beach2 = new Room("The end of the beach. The sea stretches endlessly to the south and west. To your east, you see a small cave in the base of the cliff. The lighthouse towers to the northwest." [], [beach1, cave1] );
let cave1 = new Room("The small cave entrance opens up into a large chamber, lit by a torch on the wall. Snakes and spiders slither and scurry into the shadows as you enter. There appears to be another chamber in the cave to your right. The air is thick and still.", [torch], [cave2, beach2]);
let cave2= new Room("The light of your torch reveals a figure slumped against the far wall of the chamber. It is a skeleton. Only bones and tattered clothes remain." [key, letter, skeleton], [cave1]);

let behavior = {
  move: ["north", "south", "east", "west"],
  go: ["north", "south", " east", "west"],
  head: ["north", "south", "east", "west"],
  take: ["key", "gas", "torch", "letter", "telescope"],
  open: ["door", "letter"],
  enter: ["cave", "lighthouse", "boat"],
  pickup: ["letter", "gas", "torch"],
  drop: ["key", "gas", "torch", "letter", "telescope"],
  inspect: ["skeleton"],
};

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
itemArr = ["key", "gas", "torch", "skeleton", "telescope", "letter"];
//Or what if we make an object of the actions and targets and use them as key value pairs??
