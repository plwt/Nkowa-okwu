const WordClass = {
  ADJ: {
    value: 'ADJ',
    label: 'Adjective',
  },
  ADV: {
    value: 'ADV',
    label: 'Adverb',
  },
  AV: {
    value: 'AV',
    label: 'Active verb',
  },
  MV: {
    value: 'MV',
    label: 'Medial verb',
  },
  PV: {
    value: 'PV',
    label: 'Passive verb',
  },
  CJN: {
    value: 'CJN',
    label: 'Conjunction',
  },
  DEM: {
    value: 'DEM',
    label: 'Demonstrative',
  },
  NM: {
    value: 'NM',
    label: 'Name',
  },
  NNC: {
    value: 'NNC',
    label: 'Noun',
  },
  NNP: {
    value: 'NNP',
    label: 'Proper noun',
  },
  CD: {
    value: 'CD',
    label: 'Number',
  },
  PREP: {
    value: 'PREP',
    label: 'Preposition',
  },
  PRN: {
    value: 'PRN',
    label: 'Pronoun',
  },
  FW: {
    value: 'FW',
    label: 'Foreign word',
  },
  QTF: {
    value: 'QTF',
    label: 'Quantifier',
  },
  WH: {
    value: 'WH',
    label: 'Interrogative',
  },
  INTJ: {
    value: 'INTJ',
    label: 'Interjection',
  },
  ISUF: {
    value: 'ISUF',
    label: 'Inflectional suffix',
  },
  ESUF: {
    value: 'ESUF',
    label: 'Extensional suffix',
  },
  SYM: {
    value: 'SYM',
    label: 'Punctuations',
  },
};

const MINIMUM_RESULTS = 2;
const AUDIO_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zIDl2Nmg0bDUgNVY0TDcgOUgzem0xMy41IDNjMC0xLjc3LTEuMDItMy4yOS0yLjUtNC4wM3Y4LjA1YzEuNDgtLjczIDIuNS0yLjI1IDIuNS00LjAyek0xNCAzLjIzdjIuMDZjMi44OS44NiA1IDMuNTQgNSA2Ljcxcy0yLjExIDUuODUtNSA2LjcxdjIuMDZjNC4wMS0uOTEgNy00LjQ5IDctOC43N3MtMi45OS03Ljg2LTctOC43N3oiLz48L3N2Zz4=';

const createWordResult = (word) => {
  const card = document.createElement('div');
  const leftSection = document.createElement('div');
  leftSection.style.flex = '6';
  const rightSection = document.createElement('div');
  rightSection.style.flex = '1';
  card.appendChild(leftSection);
  card.appendChild(rightSection);
  card.classList.add('word-card');
  const wordLabel = document.createElement('h1');
  wordLabel.classList.add('word-label');
  wordLabel.innerText = word.word;
  const partOfSpeechLabel = document.createElement('h2');
  partOfSpeechLabel.innerText = WordClass[word.wordClass].label;
  const definitionLabel = document.createElement('p');
  definitionLabel.style.color = 'var(--dark-gray-color)';
  definitionLabel.innerText = `1. ${word.definitions[0]}`;

  if (word.nsibidi) {
    const nsibidiLabel = document.createElement('p');
    nsibidiLabel.innerText = word.nsibidi;
    nsibidiLabel.classList.add('nsibidi');
    leftSection.appendChild(nsibidiLabel);
  }
  leftSection.appendChild(wordLabel);
  leftSection.appendChild(partOfSpeechLabel);
  leftSection.appendChild(definitionLabel);
  if (word.pronunciation) {
    const audioPronunciation = document.createElement('img');
    audioPronunciation.setAttribute('src', AUDIO_IMAGE);
    audioPronunciation.style.height = '24px';
    audioPronunciation.style.width = '24px';
    audioPronunciation.style.cursor = 'pointer';
    audioPronunciation.addEventListener('click', () => {
      let audio = new Audio(word.pronunciation);
      audio.play().catch(() => {
        fetch(word.pronunciation)
          .then(async (res) => {
            const audioBlob = await res.blob();
            const base64 = await blobToBase64(audioBlob);
            audio = new Audio(base64);
            audio.play();
          });
      });
    });
    rightSection.appendChild(audioPronunciation);
  }
  return card;
}

const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const hideElement = (element) => {
  element.style.opacity = '0';
  element.style.pointerEvents = 'none';
  setTimeout(() => {
    element.style.top = '0';
  }, 150);
}

const card = document.createElement('div');
card.classList.add('nkowaokwu-popup');
card.classList.add('nkowaokwu');

const cardWords = document.createElement('div');
cardWords.style.height = '100%';
cardWords.style.flex = '1';

const bottomLinkContainer = document.createElement('div');
bottomLinkContainer.classList.add('bottom-link-container');
const poweredBy = document.createElement('span');
poweredBy.innerText = 'Powered by Nkọwa okwu';
const moreLink = document.createElement('a');
moreLink.setAttribute('target', '_blank');
moreLink.setAttribute('href', 'https://nkowaokwu.com');
moreLink.classList.add('more-link');
bottomLinkContainer.replaceChildren(poweredBy, moreLink);
card.appendChild(cardWords);
card.appendChild(bottomLinkContainer);

const style = document.createElement('style');
style.innerText = "@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap')";
document.body.appendChild(style)


hideElement(card);
document.body.appendChild(card);

const INVALID_STRINGS = ['\n', ' '];
const KEYWORD_LIMIT = 50;

const isValidElement = (node) => (
  node
  && !node.closest('.nkowaokwu-popup')
  && !node.closest('input')
  && !node.closest('textarea')
  && !node.closest('[contenteditable="true"]')
  && !node.closest('[contenteditable]')
  && !node.querySelector('input')
  && !node.querySelector('textarea')
  && !node.querySelector('[contenteditable="true"]')
  && !node.querySelector('[contenteditable]')
  && !node.hasAttribute('contenteditable')
  && node.tagName !== 'INPUT'
  && node.tagName !== 'TEXTAREA'
);

let isOpen = false;
let timeoutRef = null;
document.onclick = () => {
  if (timeoutRef) {
    clearTimeout(timeoutRef);
  }
  timeoutRef = setTimeout(() => {
    const selection = window.getSelection();
  const keyword = (
    !INVALID_STRINGS.includes(selection.toString())
    && selection.toString().length > 0
    && selection.toString().length < KEYWORD_LIMIT
  )
    ? selection.toString().trim()
    : '';
  const anchorNode = selection.anchorNode
    ? selection.anchorNode.getBoundingClientRect
      ? selection.anchorNode
      : selection.anchorNode.parentNode
    : selection.anchorNode;

  if (isValidElement(anchorNode) && keyword) {
    fetch(`https://nkowaokwu.com/search?word=${keyword}&page=0`)
    .then(async (res) => {
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return doc;
    })
    .then((res) => {
      isOpen = true;
      const dataScript = Array.from(res.querySelectorAll('script')).find((scriptElement) => scriptElement.innerText.startsWith('window'));
      const { pageCount, words: data } = JSON.parse(dataScript.innerText.split('window.__INITIAL_DATA__ = ')[1]);
      const words = data.splice(0, MINIMUM_RESULTS);
      const wordResults = words.map(createWordResult);

      if (keyword && !words.length) {
        cardWords.style.display = 'flex';
        cardWords.style.justifyContent = 'center';
        cardWords.style.alignItems = 'center';
        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add('no-results-container');
        const noSearchResults = document.createElement('h1');
        noSearchResults.classList.add('no-search-results-label');
        const addWordButton = document.createElement('button');
        addWordButton.classList.add('primary-button');
        addWordButton.classList.add('add-word-button');
        addWordButton.onclick = () => window.open(`https://nkowaokwu.com/search?word=${keyword}&page=0`, '_blank');
        noSearchResults.innerText = `Sorry, we don't have '${keyword}'`;
        addWordButton.innerText = `Suggest adding '${keyword}'`
        resultsContainer.replaceChildren(noSearchResults, addWordButton);
        cardWords.replaceChildren(resultsContainer);

        moreLink.innerText = '';

        // Renders the card on screen
        card.style.top = `${anchorNode.getBoundingClientRect().bottom + window.scrollY}px`;
        card.style.left = `${anchorNode.getBoundingClientRect().left + selection.baseOffset}px`;

        card.style.opacity = '1';
        card.style.pointerEvents = 'all';
        element.style.top = '';

        return;
      }
      if (words.length > 0) {
        cardWords.style.display = 'block';
        const moreResultsCount = pageCount - words.length;
        moreLink.setAttribute('href', `https://nkowaokwu.com/search?word=${keyword}&page=0`);
        moreLink.innerText = moreResultsCount <= 0 ? 'See results >>' : `${moreResultsCount} more result${moreResultsCount === 1 ? '' : 's'} >>`;

        // Updates contents of the pop up with words and links
        cardWords.replaceChildren(...wordResults);
        bottomLinkContainer.replaceChildren(poweredBy, moreLink);
  
        // Renders the card on screen
        card.style.top = `${anchorNode.getBoundingClientRect().bottom + window.scrollY}px`;
        card.style.left = `${anchorNode.getBoundingClientRect().left + selection.baseOffset}px`;

        card.style.opacity = '1';
        card.style.pointerEvents = 'all';
        element.style.top = '';
      }
    });
  }

  if (!keyword) {
    isOpen = false;
    hideElement(card);
    return;
  }
  }, isOpen ? 150 : 0);
}