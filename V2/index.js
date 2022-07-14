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
  const rightSection = document.createElement('div');
  card.appendChild(leftSection);
  card.appendChild(rightSection);
  card.classList.add('word-card');
  const wordLabel = document.createElement('h1');
  wordLabel.innerText = word.word;
  const partOfSpeechLabel = document.createElement('h2');
  partOfSpeechLabel.innerText = WordClass[word.wordClass].label;
  const definitionLabel = document.createElement('p');
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
      const audio = new Audio(word.pronunciation);
      audio.play();
    });
    rightSection.appendChild(audioPronunciation);
  }
  return card;
}

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyword = e.target.search.value;
    fetch(`https://nkowaokwu.com/search?word=${keyword}&page=0`)
    .then(async (res) => {
      const html = await res.text();
      const parser = new DOMParser();
	    const doc = parser.parseFromString(html, 'text/html');
      return doc;
    })
    .then((res) => {
      const dataScript = Array.from(res.querySelectorAll('script')).find((scriptElement) => scriptElement.innerText.startsWith('window'));
      const { pageCount, words: data } = JSON.parse(dataScript.innerText.split('window.__INITIAL_DATA__ = ')[1]);
      const words = data.splice(0, MINIMUM_RESULTS);
      const wordResults = words.map(createWordResult);
      if (words.length > 0) {
        const moreResultsCount = pageCount - words.length;
        document.querySelector('.results-container').replaceChildren(...wordResults);
        document.querySelector('.more-link').setAttribute('href', `https://nkowaokwu.com/search?word=${keyword}&page=0`);
        document.querySelector('.more-link').innerText = moreResultsCount <= 0 ? 'See results >>' : `${moreResultsCount} more result${moreResultsCount === 1 ? '' : 's'} >>`;
      } else {
        const noSearchResults = document.createElement('h1');
        noSearchResults.classList.add('no-search-results-label');
        const addWordButton = document.createElement('button');
        addWordButton.classList.add('primary-button');
        addWordButton.style.margin = '0 auto';
        addWordButton.onclick = () => window.open(`https://nkowaokwu.com/search?word=${keyword}&page=0`, '_blank');
        noSearchResults.innerText = `Sorry, we don't have '${keyword}'`;
        addWordButton.innerText = `Suggest adding '${keyword}'`
        document.querySelector('.results-container').replaceChildren(noSearchResults, addWordButton);
        document.querySelector('.more-link').innerText = '';
      }
    });
  });
});