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


  //Player object. Includes directions player can move and actions to take, initialize inventory
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
    playerInv: [],
  };


  //Classes

  //Item class. 
  class Item {
    constructor(item, description, moveable) {
      this.item = item;
      this.description = description;
      this.moveable = moveable;
    }
  }

  //Room class
  class Room {
    constructor(name, description, inventory, connectingRooms) {
      //constructor for rooms. includes rooms inventory and what rooms the player can move to from there.
      this.name = name;
      this.description = description;
      this.inventory = inventory;
      this.connectingRooms = connectingRooms;
      this.isLocked = false;
    }
  }

  //Creating items objects

  let boatKey = new Item("key", "Ordinary boat key.", false);

  let torch = new Item(
    "torch",
    "A torch in a sconce on the cave wall. It partially lights the room.",
    true
  );

  let skeleton = new Item(
    "skeleton",
    "The skeleton must have been here for years. It is completely decomposed. In its left hand is a folded paper. The light of your torch reflects off of a key in the coats front pocket.",
    false
  );

  let lighthouseKey = new Item("key", "An old rusted key.", true);

  let letter = new Item(
    "letter",
    "The letter reads as so: 'My darling, \n I fear this is the last letter I will ever write you. By my count, my relief should have arrived 4 months ago. \n I have been abandoned. I finished the last of my rations weeks ago, and the gulls no longer land close enough for me to catch.  \n I gaze into the lighthouse’s great beacon at night as it signals to an empty sea. It speaks to me. I dare not relay what it says. \n The sun mocks me. I can no longer stand its great heat or rays. I will find somewhere dark to rest.'",
    true
  );

  let gasCan = new Item(
    "gas can",
    "An old rusted can of gas. It should be light enough to carry.",
    true
  );


  //Rooms objects

  let boat = new Room(
    "boat",
    "An old fishing boat, worn but in working condition. There are keys in the ignition. It feels familiar, but you are sure you have never been here before.",
    ["boatKey"],
    ["beach1"],
    false
  );

  let beach1 = new Room(
    "beach1",
    "On this desolate patch of sand, there is a large, decrepit lighthouse on a small peninsula that juts into the ocean to the west . The door is sturdy and the handle is old and rusted. The cliffs to the east remain. The mysterious boat remains to the north. The beach continues to the south.\n\n",
    [],
    ["boat", "lighthouse", "beach2"],
    false
  );

  let lighthouse = new Room(
    "lighthouse",
    "The heavy door of the lighthouse creeks open. Beams of light shine in through the windows, catching the dust suspended in the air. The stairs that circle the inside walls of the lighthouse are crumbled, leaving the upper levels inaccessible. You wouldn’t climb them if you could. The smell of gasoline wafts from a large can in the room.\n\n",
    ["gasCan"],
    ["beach1"],
    true
  );

  let beach2 = new Room(
    "beach2",
    "The end of the beach. The sea stretches endlessly to the south and west. To your east, you see a small cave in the base of the cliff. The lighthouse towers to the northwest.\n\n",
    [],
    ["beach1", "cave1"],
    false
  );

  let cave1 = new Room(
    "cave1",
    "The small cave entrance opens up into a large chamber, lit by a torch on the wall. Snakes and spiders slither and scurry into the shadows as you enter. There appears to be another chamber in the cave to your south. The air is thick and still.\n\n",
    ["cave2", "beach2"],
    false
  );

  let cave2 = new Room(
    "cave2",
    "There is barely enough light in the room to see a figure slumped against the far wall of the chamber. It is a skeleton. Only bones and tattered clothes remain.\n\n",
    [lighthouseKey, letter, skeleton],
    ["cave1"],
    false
  );

  /* below is the table that dictates what rooms each room leads to*/
  let transitions = {
    boat: ["beach1"],
    beach1: ["lighthouse", "beach2", "boat"],
    lighthouse: ["beach2"],
    beach2: ["beach1", "cave1"],
    cave1: ["beach2", "cave2"],
    cave2: ["cave1"],
  };

  /*function for moving from room to room*/
  function changeRoom(nextRoom) {
    if (transitions[currentRoom].includes(nextRoom)) {
      currentRoom = nextRoom;
    } else {
      console.log(`You can\'t get there from here`);
    }
  }

  /*function for picking up items*/
  function take() {
    if (this.moveable) {
      player.playerInv.push(this.item);
      console.log("You've taken the " + this.item + ".");
    } else console.log("You can't take that!");
  }
  const welcomeMessage = `You wake up on a small fishing boat that has landed upon a beach. You have no recollection of how you got there. Cliffs rise a hundred feet from the sand in front of you to the east. To the north and west there is only open ocean. The beach stretches to the south as far as the eye can see. There are keys in the ignition...\n\n>_`;

  let currentRoom = "boat"; //sets the starting room
  let answer = await ask(welcomeMessage);

  /*the following section dictates what happens in each room based on what the user inputs. each room is built as a loop, and then moves to next room/loop. working on going back to previous rooms*/
  
 
  while (currentRoom === "boat") {
    if (answer === "move south") {
      changeRoom("beach1");
      break;
    } else if (answer === "move east") {
      console.log("The cliffs are too high to climb");
    } else if (answer === "move north" || answer === "move west") {
      console.log("The ocean stretches too far for you to swim your way out");
    } else if (
      answer === "turn key" ||
      answer === "start boat" ||
      answer === "start engine"
    ) {
      console.log(
        "The engine rumbles but does not turn over. The gas needle is on empty"
      );
    } else if (answer === "take key"){
    console.log(boatKey.description + "\nYou should leave this here.")
    } else console.log("I don't understand");
    answer = await ask("\n>_");
  }

  answer = await ask(beach1.description + "\n>_");

  while (currentRoom === "beach1") {
    if (answer === "move south") {
      changeRoom("beach2");
      break;
    } else if (answer === "move north") {
      changeRoom("boat");
      break;
    } else if (answer === "move east") {
      console.log("The cliffs are too high to climb");
    } else if (answer === "move west" && player.playerInv.includes("key")) {
      changeRoom("lighthouse");
      break;
    } else if (answer === "move west" && !player.playerInv.includes("key")) {
      console.log("The handle does not budge. Maybe there is a key nearby.");
    } else console.log("I don't understand");
    answer = await ask("\n>_");
  }

  answer = await ask(beach2.description + "\n>_");

  while (currentRoom === "beach2") {
    if (answer === "move east") {
      changeRoom("cave1");
      break;
    } else if (answer === "move west" || answer === "move south") {
      console.log("The ocean stretches too far for you to swim your way out");
    } else if (answer === "move north") {
      changeRoom("beach1");
      break;
    } else console.log("I don't understand");
    answer = await ask("\n>_");
  }

  answer = await ask(cave1.description + "\n>_");

  while (currentRoom === "cave1") {
    if (answer === "move south") {
      changeRoom("cave2");
      break;
    } else if (answer === "move north" || answer === "move east") {
      console.log("You cannot leave the cave this way");
    } else if (answer === "move west") {
      changeRoom("beach2");
      break;
    } else console.log("I don't understand");
    answer = await ask("\n>_");
  }

  answer = await ask(cave2.description + "\n>_");

  while (currentRoom === "cave2") {
    if (
      answer === "move south" ||
      answer === "move east" ||
      answer === "move west"
    ) {
      console.log("You cannot leave the cave this way");
    } else if (answer === "move north") {
      changeRoom("cave1");
      break;
    } else if (answer === "inspect skeleton") {
      console.log(
        "The skeleton must have been here for years. It is completely decomposed. In its left hand is a folded letter. The small amount of light in the room reveals a key in the coat's front pocket."
      );
    } else if (answer === "take key") {
      player.playerInv.push(lighthouseKey);
      cave2.inventory.pop(lighthouseKey);
      console.log(lighthouseKey.description)
    } else if (answer === "take letter") {
      player.playerInv.push(letter);
      cave2.inventory.pop(letter);
    } else if (answer === "read letter"){
      player.playerInv.push(letter);
      cave2.inventory.pop(letter);
      console.log(letter.description)
      }
    else console.log("I don't understand");
    answer = await ask("\n>_");
}

  answer = await ask(lighthouse.description + "\n>_");

  while (currentRoom === "lighthouse") {
    if (answer === "move east") {
      changeRoom = "beach1";
    } else if (
      answer === "move north" ||
      answer === "move west" ||
      "move south"
    ) {
      console.log("You cannot leave the lighthouse this way");
    } else if (answer === "take gas can" || answer === "take gas" || answer === "take can"){
      player.playerInv.push(gasCan);
      lighthouse.inventory.pop(gasCan);
      console.log(gasCan.description);
    } else console.log("I don't understand");
    answer = await ask("\n>_");
  }
}

