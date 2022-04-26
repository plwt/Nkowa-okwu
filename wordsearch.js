

function onRequest(info, tab) {
	var selection = info.selectionText;
//do something with the selection
if(selection){
	var serviceCall = 'https://nkowaokwu.com/search?word=' + encodeURIComponent(selection);
	chrome.tabs.create({url: serviceCall});
}
};

chrome.contextMenus.create({
	id: "so_search",
	contexts: ["selection"],
	title: "Search with Nkọwa okwu",
	"onclick" : onRequest
});
