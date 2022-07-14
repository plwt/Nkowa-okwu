const contextMenuItem = {
  id: 'nkowaokwu',
  title: 'Translate: "%s" on Nkọwa okwu',
  contexts: ['selection'],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
  chrome.tabs.create({ 'url': `https://nkowaokwu.com/search?word=${clickData.selectionText}&page=0` }, function (tab) {
  })
});
