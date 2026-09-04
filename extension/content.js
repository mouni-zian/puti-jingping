// 提取页面正文
function extractText() {
  // 尝试获取文章主体
  const selectors = ['article', 'main', '[role="main"]', '.article', '.post', '.content', '.article-content'];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el && el.innerText.length > 100) return el.innerText.substring(0, 3000);
  }
  // 兜底：body 文本
  return document.body.innerText.substring(0, 3000);
}

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'extract') {
    sendResponse({ text: extractText() });
  }
});