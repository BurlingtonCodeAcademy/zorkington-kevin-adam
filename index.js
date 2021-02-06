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
  const player = {
    direction: ["north", "south", "east", "west"],
    movement: ["move", "go"],
    action: [
      "take",
      "pickup",
      "read",
      "use",
      "inspect",
      "examine",
      "turn",
      "enter",
      "open",
      "drop",
      "throw",
      "look",
    ],
    playerInv: [" "],
  };

  class Item {
    constructor(name, description, moveable, itemAction) {
      this.name = name;
      this.description = description;
      this.moveable = moveable;
      this.itemAction = itemAction;
    }
  }
  class Room {
    constructor(name, description, inventory, connectingRooms) {
      this.name = name;
      this.description = description;
      this.inventory = inventory;
      this.connectingRooms = connectingRooms;
      this.islocked = false;
    }
  }

  let boatKey = new Item("key", "Ordinary boat key.", false, [
    "turn",
    "use",
    "inspect",
    "examine",
    "look at",
  ]);

  let torch = new Item(
    "torch",
    "A torch in a sconce on the cave wall. It partially lights the room.",
    true,
    ["take", "drop", "throw", "pick up", "inspect", "examine", "look at"]
  );

  let skeleton = new Item(
    "skeleton",
    "The skeleton must have been here for years. It is completely decomposed. In its left hand is a folded paper. The light of your torch reflects off of a key in the coats front pocket.",
    false,
    ["inspect", "examine"]
  );

  let lighthouseKey = new Item("key", "An old rusted key.", true, [
    "take",
    "pick up",
    "drop",
    "inspect",
    "examine",
    "look at",
  ]);

  let letter = new Item(
    "letter",
    "The letter reads as so: 'My darling, \n I fear this is the last letter I will ever write you. By my count, my relief should have arrived 4 months ago. \n I have been abandoned. I finished the last of my rations weeks ago, and the gulls no longer land close enough for me to catch.  \n I gaze into the lighthouse’s great beacon at night as it signals to an empty sea. It speaks to me. I dare not relay what it says. \n The sun mocks me. I can no longer stand its great heat or rays. I will find somewhere dark to rest.'",
    true,
    ["take", "pick up", "read", "inspect", "examine", "look at"]
  );

  let gasCan = new Item(
    "gas can",
    "An old rusted can of gas. It should be light enough to carry.",
    true,
    ["take", "pick up", "drop", "examine", "inspect", "look at"]
  );

  let boat = new Room(
    "boat",
    "An old fishing boat, worn but in working condition. There are keys in the ignition. It feels familiar, but you are sure you have never been here before.",
    ["boatKey"],
    ["beach1"], false
  );

  let beach1 = new Room(
    "beach1",
    "On this desolate patch of sand, there is a large, decrepit lighthouse on a small peninsula that juts into the ocean to the west . The door is sturdy and the handle is old and rusted. The cliffs to the east remain. The mysterious boat remains to the north. The beach continues to the south.",
    [],
    ["boat", "lighthouse", "beach2"], false
  );

  let lighthouse = new Room(
    "lighthouse",
    "The heavy door of the lighthouse creeks open. Beams of light shine in through the windows, catching the dust suspended in the air. The stairs that circle the inside walls of the lighthouse are crumbled, leaving the upper levels inaccessible. You wouldn’t climb them if you could. The smell of gasoline wafts from a large can in the room."[
      ("gasCan", " ")
    ],
    ["beach1"], true
  );

  let beach2 = new Room(
    "beach2",
    "The end of the beach. The sea stretches endlessly to the south and west. To your east, you see a small cave in the base of the cliff. The lighthouse towers to the northwest.",
    [],
    ["beach1", "cave1"], false
  );

  let cave1 = new Room(
    "cave1",
    "The small cave entrance opens up into a large chamber, lit by a torch on the wall. Snakes and spiders slither and scurry into the shadows as you enter. There appears to be another chamber in the cave to your right. The air is thick and still.",
    ["torch"],
    ["cave2", "beach2"], false
  );

  let cave2 = new Room(
    "cave2",
    "The light of your torch reveals a figure slumped against the far wall of the chamber. It is a skeleton. Only bones and tattered clothes remain."[
      ("lighthouseKey", "letter", "skeleton")
    ],
    ["cave1"], false
  );

  let currentRoom = "boat";

  let transitions = {
    boat: ["beach1"],
    beach1: ["lighthouse", "beach2", "boat"],
    lighthouse: ["beach2"],
    beach2: ["beach1", "cave1"],
    cave1: ["beach2", "cave2"],
    cave2: ["cave1"],
  };

  

  function changeRoom(nextRoom) {
    if (transitions[currentRoom].includes(nextRoom)) {
      currentRoom = nextRoom;
    } else {
      console.log(`You can\'t get there from here`);
    }
  }
  function takeInv(item) {
    if (this.moveable) {
      player.playerInv.push(this.item);
      console.log("You've taken the " + item + " .");
    } else console.log("You can't take that!");
  }
  const welcomeMessage = `You wake up on a small fishing boat that has landed upon a beach. You have no recollection of how you got there. 
  Cliffs rise a hundred feet from the sand in front of you to the east. To the north and west there is only open ocean. 
  The beach stretches to the south as far as the eye can see. There are keys in the ignition...\n>_`;

  let answer = await ask(welcomeMessage);


  while (currentRoom === "boat"){



    if (answer === "move south") {
      changeRoom("beach1");
      break;
    } else if (answer === "move east") {
      console.log("The cliffs are too high to climb");
    } else if (answer === "move north" || answer === "move west") {
      console.log("The ocean stretches too far for you to swim your way out");
    } else console.log ("I don't understand")
      answer = await ask ("\n>_");

  }
  console.log(currentRoom);
  answer = await ask(beach1.description + "\n>_");


  while (currentRoom === "beach1"){
  
    
    if (answer === "move south") {
      changeRoom("beach2");
      break;
    } else if (answer === "move north") {
      changeRoom("boat");
      //break;
    } else if (answer === "move east"){
      console.log ("The cliffs are too high to climb")
    } else if (answer === "move west" && player.playerInv.includes("key")){
      changeRoom("lighthouse");
      //break;
    }else if (answer === "move west" && !player.playerInv.includes("key")){
      console.log ("The handle does not budge. Maybe there is a key nearby");

    } else console.log ("I don't understand");
    answer = await ask ("\n>_")
  }  

  answer = await ask (beach2.description + "\n>_");

  while (currentRoom === "beach2"){

    if (answer === "move east") {
      changeRoom("cave1");
      break;
    } else if (answer === "move west" || answer === "move south") {
      console.log ("The ocean stretches too far for you to swim your way out")
    } else if (answer === "move north") {
      changeRoom("beach1");
      break;
    } else console.log ("I don't understand");
      answer = await ask ("\n>_")
  }

  answer = await ask (cave1.description + "\n>_")

  while (currentRoom === "cave1"){

    if (answer === "move south") {
      changeRoom("cave2");
      break;
    } else if (answer === "move north" || answer === "move east") {
      console.log ("You cannot leave the cave this way");
    } else if (answer === "move west") {
      changeRoom("beach2");
      break;
    } else console.log ("I don't understand");
      answer = await ask ("\n>_")
  }

}
