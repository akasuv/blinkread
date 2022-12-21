// @ts-ignore
import mount from "./content?script";

const API_ENDPOINT = "https://blinkread-production.up.railway.app/summary";

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id as number },
		files: [mount],
	});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	fetch(API_ENDPOINT, {
		method: "POST",
		body: request.content,
	})
		.then((res) => {
			return res.text();
		})
		.then((res) => sendResponse({ text: res }));

	return true;
});
