const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `You awake on a beach with no recollection of how you got there, surrounded by shells and driftwood.
   The sun beats down as the waves lap at your feet. Before you lies a cliff a hundred feet high
   that stretches the length of the beach. To your immediate north, the beach ends, and there is no way around the cliff. 
   To the south lies an old fishing boat. `;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}