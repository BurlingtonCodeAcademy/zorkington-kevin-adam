const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `You awake on a beach with no recollection of how you got there.
   The sun beats down as the waves lap at your feet. To your immediate north, a boat rocks in the shallows. 
   To the south, the beach stretches on as far the eye can see.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}