

function openAPage() {
  
   browser.tabs.create({
     "url": "https://nkowaokwu.com/home"
   });
}



browser.browserAction.onClicked.addListener(openAPage);
