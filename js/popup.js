document.addEventListener('DOMContentLoaded', function () {
    const addLinkButton = document.getElementById('addLink');
    const clearLinksButton = document.getElementById('clearLinks');
    const exportCSVButton = document.getElementById('exportCSV');
    const exportJSONButton = document.getElementById('exportJSON');
    const linkList = document.getElementById('linkList');
  
    // Initialize the links array
    let links = [];
  
    // Load saved links from storage
    chrome.storage.sync.get(['links'], function (result) {
      if (result.links) {
        links = result.links;
        renderLinks();
      }
    });
  
    // Add the current tab's link to the list
    addLinkButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        const link = currentTab.url;
        links.push(link);
        saveLinks();
        renderLinks();
      });
    });
  
    // Clear all links
    clearLinksButton.addEventListener('click', function () {
      links = [];
      saveLinks();
      renderLinks();
    });
  
    // Export links as CSV
    exportCSVButton.addEventListener('click', function () {
      const csvData = links.join('\n');
      downloadFile(csvData, 'links.csv', 'text/csv');
    });
  
    // Export links as JSON
    exportJSONButton.addEventListener('click', function () {
      const jsonData = JSON.stringify(links, null, 2);
      downloadFile(jsonData, 'links.json', 'application/json');
    });
  
    // Render the list of links
    function renderLinks() {
      linkList.innerHTML = '';
      for (const link of links) {
        const listItem = document.createElement('li');
        listItem.textContent = link;
        linkList.appendChild(listItem);
      }
    }
  
    // Save links to storage
    function saveLinks() {
      chrome.storage.sync.set({ links });
    }
  
    // Helper function to download a file
    function downloadFile(data, filename, type) {
      const blob = new Blob([data], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
  