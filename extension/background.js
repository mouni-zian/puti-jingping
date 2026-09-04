chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'mirror',
    title: '觉屏 · 照见选中内容',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'mirror') {
    chrome.runtime.sendMessage({ text: info.selectionText });
  }
});