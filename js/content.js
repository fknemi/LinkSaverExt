// content.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'extractLinks') {
      const links = Array.from(document.querySelectorAll('a')).map((a) =>
        a.href.trim()
      );
      sendResponse({ links });
    }
  });
  