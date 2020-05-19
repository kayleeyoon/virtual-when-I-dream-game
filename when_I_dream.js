var numberOfFairies = 1;
var numberOfBoogeymen = 1;
var numberOfSandmen = 1;
var dreamerIndex = 0;

var round = 0;

var fairyList = [];
var boogeymenList = [];
var sandmenList = [];

var playerNames = [];
var assignedPlayers = [];

var usedWords = []

var currentWord = '';

var incorrectWords = [];
var correctWords = [];

function handlePlayerNameChange() {
  playerNames = event.target.value.trim(/\s+/g, '').split(",");
  console.log(playerNames)
}

function handlePlayerChange(type) {
  if (type == 'fairy') {
    numberOfFairies = parseInt(event.target.value);
  }
  else if (type == 'boogeyman') {
    numberOfBoogeymen = parseInt(event.target.value);
  }
  else {
    numberOfSandmen = parseInt(event.target.value);
  }
}

function revealRoles() {
  let roleSection = document.getElementsByClassName('no--dreamer--view')[0];
  roleSection.style.display = 'block';
}

function handleCorrectAnswer() {
  correctWords.push(currentWord);
  document.getElementById('correct-words').innerHTML = correctWords.join('<br>');
  document.getElementById('num-correct').innerHTML = '(' + String(correctWords.length) + ')';
  nextWord();
}

function handleIncorrectAnswer() {
  incorrectWords.push(currentWord);
  document.getElementById('incorrect-words').innerHTML = incorrectWords.join('<br>');
  document.getElementById('num-incorrect').innerHTML = '(' + String(incorrectWords.length) + ')';
  nextWord();
}

function nextWord() {
  if (possibleWords.length == 0 && (incorrectWords.length > 0 || correctWords.length > 0)) {
    handleNoMoreWords();
    return;
  }
  let randomIndex = Math.floor(Math.random() * possibleWords.length);
  currentWord = possibleWords[randomIndex];
  while (usedWords.includes(currentWord)) {
    randomIndex = Math.floor(Math.random() * possibleWords.length);
    currentWord = possibleWords[randomIndex];
  }
  possibleWords.splice(randomIndex, 1);
  usedWords.push(currentWord);
  document.getElementById('current-word').innerHTML = currentWord;
}

function handleNewRound() {
  assignedPlayers = []
  fairyList = [];
  boogeymenList = [];
  sandmenList = [];
  incorrectWords = [];
  correctWords = [];

  let roleSection = document.getElementsByClassName('no--dreamer--view')[0];
  roleSection.style.display = 'none';

  if (dreamerIndex < playerNames.length) {
    let nextDreamer = playerNames[dreamerIndex];
    let dreamerRole = '(Sandman)'

    let randomRoleIndex = Math.floor(Math.random() * 2);
    if (randomRoleIndex == 0) {
      dreamerRole = '(Fairy)';
      fairyList.push(nextDreamer);
    }
    else if (randomRoleIndex == 1) {
      dreamerRole = '(Boogeyman)';
      boogeymenList.push(nextDreamer);
    }

    document.getElementById('correct-words').innerHTML = correctWords;
    document.getElementById('incorrect-words').innerHTML = incorrectWords;
    document.getElementById('num-correct').innerHTML = '';
    document.getElementById('num-incorrect').innerHTML = '';

    document.getElementById('dreamer').innerHTML = nextDreamer;
    document.getElementById('dreamer-role').innerHTML = dreamerRole;
    dreamerIndex += 1;
    assignedPlayers.push(nextDreamer);

    assignRoles();
  }
  else {
    dreamerIndex = 0;
    let nextDreamer = playerNames[dreamerIndex]
    let dreamerRole = '(Sandman)'

    let randomRoleIndex = Math.floor(Math.random() * 3);
    if (randomRoleIndex == 0) {
      dreamerRole = '(Fairy)';
      fairyList.push(nextDreamer);
    }
    else if (randomRoleIndex == 1) {
      dreamerRole = '(Boogeyman)';
      boogeymenList.push(nextDreamer);
    }
    document.getElementById('dreamer').innerHTML = nextDreamer;
    document.getElementById('dreamer-role').innerHTML = dreamerRole;
    assignedPlayers.push(nextDreamer);
    assignRoles();
  }
}

function handleStartRound() {
  setTimeout(handleOutOfTime, 90000);
  nextWord();
}

function handleOutOfTime() {
  alert('Out of time!')
}

function handleNoMoreWords(){
  alert('No more words :(')
}

function assignRoles() {
  let randomIndex = Math.floor(Math.random() * playerNames.length);
  let playerToAssign = playerNames[randomIndex];
  if (numberOfFairies + numberOfSandmen + numberOfBoogeymen == playerNames.length) {
    while (fairyList.length < numberOfFairies) {
      while (assignedPlayers.includes(playerToAssign)) {
        randomIndex = Math.floor(Math.random() * playerNames.length);
        playerToAssign = playerNames[randomIndex];
      }
      fairyList.push(playerToAssign);
      assignedPlayers.push(playerToAssign);
    }
    while (boogeymenList.length < numberOfBoogeymen) {
      randomIndex = Math.floor(Math.random() * playerNames.length);
      playerToAssign = playerNames[randomIndex];
      while (assignedPlayers.includes(playerToAssign)) {
        randomIndex = Math.floor(Math.random() * playerNames.length);
        playerToAssign = playerNames[randomIndex];
      }
      boogeymenList.push(playerToAssign);
      assignedPlayers.push(playerToAssign);
    }

    while (sandmenList.length < numberOfSandmen) {
      randomIndex = Math.floor(Math.random() * playerNames.length);
      playerToAssign = playerNames[randomIndex];
      while (assignedPlayers.includes(playerToAssign)) {
        randomIndex = Math.floor(Math.random() * playerNames.length);
        playerToAssign = playerNames[randomIndex];
      }
      sandmenList.push(playerToAssign);
      assignedPlayers.push(playerToAssign);
    }

    document.getElementById('fairy-player-list').innerHTML = fairyList.join(', ');
    document.getElementById('boogeyman-player-list').innerHTML = boogeymenList.join(', ');
    document.getElementById('sandman-player-list').innerHTML = sandmenList.join(', ');
  }
  else {
    alert('Please correct the number of players or the number of each role.')
  }
}

var possibleWords = [
  'abraham lincoln',
 'airplane',
 'alligator',
 'america',
 'angel',
 'angry',
 'ant',
 'applause',
 'artist',
 'attic',
 'avocado',
 'baby',
 'baby shower',
 'baby swing',
 'back seat',
 'backbone',
 'backyard',
 'baker',
 'baseball',
 'basketball',
 'bat',
 'bathroom',
 'battery',
 'beach',
 'bear',
 'beard',
 'bedbug',
 'bedroom',
 'beehive',
 'bell',
 'bib',
 'bible',
 'bicycle',
 'bike',
 'bikini',
 'bird',
 'birthday',
 'birthday cake',
 'black hole',
 'bleach',
 'blizzard',
 'blocks',
 'bomb',
 'bonnet',
 'book',
 'book shelf',
 'bottle',
 'bow tie',
 'bracelet',
 'brain',
 'branch',
 'bread',
 'bridge',
 'bruise',
 'bubble bath',
 'bucket',
 'buckle',
 'bug',
 'bumble bee',
 'bunk bed',
 'bunny',
 'burrito',
 'bus',
 'bus stop',
 'butterfly',
 'cabin',
 'cake',
 'camera',
 'canada',
 'captain',
 'car',
 'car accident',
 'car seat',
 'cardboard',
 'castle',
 'cat',
 'ceiling',
 'cereal',
 'chain saw',
 'chair',
 'chalk',
 'chandelier',
 'changing table',
 'charger',
 'cheerleader',
 'cheese',
 'chef',
 'cherry',
 'chess',
 'chicken',
 'chime',
 'china',
 'church',
 'circus',
 'circus tent',
 'city',
 'cliff',
 'cloak',
 'clock',
 'coach',
 'coal',
 'coat',
 'comedian',
 'computer',
 'convertible',
 'cookie',
 'corn',
 'cowboy',
 'crab',
 'crayon',
 'crib',
 'cruise',
 'cruise ship',
 'crust',
 'cupcake',
 'curtain',
 'cut the cord',
 'dance',
 'darts',
 'deep',
 'dent',
 'dentist',
 'deodorant',
 'desk',
 'detention',
 'diaper',
 'genie',
 'dinosaur',
 'disneyland',
 'dive',
 'diving',
 'dog',
 'doghouse',
 'doll',
 'dolphin',
 'doormat',
 'dragon',
 'dream',
 'drip',
 'drum',
 'duck',
 'dumbbell',
 'dust',
 'earthquake',
 'eel',
 'egg',
 'eiffel tower',
 'elbow',
 'electricity',
 'extension cord',
 'eyeball',
 'face',
 'facebook',
 'fang',
 'farm',
 'ferris wheel',
 'fire',
 'firefighter',
 'fireman',
 'fireworks',
 'first smile',
 'fizz',
 'flag',
 'flag pole',
 'flagpole',
 'flat',
 'flower',
 'flute',
 'flying saucer',
 'fog',
 'frame',
 'french fries',
 'frog',
 'full moon',
 'game',
 'garbage',
 'garden',
 'gate',
 'giant',
 'giraffe',
 'glasses',
 'glue',
 'goblin',
 'golden retriever',
 'gorilla',
 'hair dryer',
 'handle',
 'head',
 'headphones',
 'high heel',
 'highchair',
 'hill',
 'hippo',
 'hockey',
 'hook',
 'hopscotch',
 'horse',
 'hot dog',
 'hot tub',
 'hotel',
 'houseboat',
 'hurdle',
 'ice cream cone',
 'igloo',
 'internet',
 'ipad',
 'it’s a boy/girl',
 'jacket',
 'jellyfish',
 'joke',
 'jump',
 'jump rope',
 'junk mail',
 'keychain',
 'kiss',
 'kitchen',
 'kite',
 'kitten',
 'kiwi',
 'knee',
 'kneel',
 'knight',
 'koala',
 'lace',
 'lady bug',
 'lamp',
 'lap',
 'laptop',
 'lawnmower',
 'leak',
 'leash',
 'leprechaun',
 'light',
 'light bulb',
 'lighthouse',
 'lion',
 'lipstick',
 'list',
 'lobster',
 'lollipop',
 'magnet',
 'mailbox',
 'mailman',
 'mascot',
 'mask',
 'mattress',
 'mechanic',
 'megaphone',
 'mermaid',
 'mexico',
 'milk',
 'minion',
 'minivan',
 'mom',
 'money',
 'monkey',
 'moon',
 'mount rushmore',
 'mouse',
 'mouth',
 'mr potato head',
 'mushroom',
 'music',
 'nail polish',
 'nature',
 'new york',
 'newspaper',
 'night',
 'nightmare',
 'no sleep',
 'north pole',
 'nose',
 'nurse',
 'oar',
 'ocean',
 'olympics',
 'outside',
 'owl',
 'pacifier',
 'pajamas',
 'pancakes',
 'pantyhose',
 'paper plate',
 'park',
 'password',
 'peach',
 'peanut',
 'pharmacist',
 'photo',
 'photograph',
 'piano',
 'picnic',
 'pigtails',
 'pilgrim',
 'pillowcase',
 'pilot',
 'pineapple',
 'ping pong',
 'pinwheel',
 'pirate',
 'pizza',
 'plank',
 'playground',
 'pocket watch',
 'pool',
 'popsicle',
 'post office',
 'pumpkin',
 'pumpkin pie',
 'puppet',
 'purse',
 'queen',
 'quesadilla',
 'quilt',
 'raft',
 'rainbow',
 'raindrop',
 'rattle',
 'ray',
 'blanket',
 'recess',
 'recycle',
 'rice',
 'robot',
 'rocket',
 'rubber band',
 'rug',
 'safe',
 'salmon',
 'salt and pepper',
 'sand',
 'sand castle',
 'sandbox',
 'sasquatch',
 'scale',
 'school',
 'scrambled eggs',
 'seashell',
 'season',
 'seat belt',
 'shallow',
 'shampoo',
 'sheets',
 'shirt',
 'shoe',
 'shrink',
 'sidewalk',
 'skate',
 'skateboard',
 'ski',
 'skip',
 'sleep',
 'slide',
 'slipper',
 'snail',
 'sneeze',
 'snowball',
 'snowflake',
 'snowman',
 'solar eclipse',
 'song',
 'space',
 'speakers',
 'spider',
 'sponge',
 'spring',
 'sprinkler',
 'stairs',
 'starfish',
 'state',
 'statue of liberty',
 'stethoscope',
 'stingray',
 'stinky diaper',
 'stomach',
 'stop light',
 'stork',
 'storm',
 'strawberry',
 'stroller',
 'suitcase',
 'sun',
 'sunburn',
 'sunglasses',
 'sushi',
 'swamp',
 'sweater',
 'swing',
 'tadpole',
 'teacher',
 'teapot',
 'teepee',
 'telescope',
 'the beach',
 'the library',
 'the ocean',
 'the united states',
 'the white house',
 'the zoo',
 'thief',
 'think',
 'thread',
 'time machine',
 'tiptoe',
 'tire',
 'toast',
 'toaster',
 'toothbrush',
 'toothpaste',
 'tourist',
 'train',
 'treasure',
 'tricycle',
 'trip',
 'truck',
 'turkey',
 'turtle',
 'tusk',
 'tutu',
 'tv',
 'united states',
 'vacation',
 'volleyball',
 'watch',
 'watering can',
 'wax',
 'whale',
 'whistle',
 'wifi',
 'wig',
 'wing',
 'winter',
 'worm',
 'yardstick',
 'zombie',
 'zoo'
];
