const input = document.getElementById('input');
const result = document.getElementById('result');
const btn = document.getElementById('analyze');

chrome.runtime.onMessage.addListener(msg => { if (msg.text) input.value = msg.text; });

btn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;
  let key = localStorage.getItem('puti_api_key');
  if (!key) {
    key = prompt('请输入 DeepSeek API Key:');
    if (!key) return;
    localStorage.setItem('puti_api_key', key);
  }
  result.style.display = 'block';
  result.textContent = '照见中...';
  try {
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是认知防御分析工具。分析文本中的情绪操纵、认知偏见、信息战手法。简洁中文回复，分三点：1.操纵手法 2.情绪触发点 3.应对建议。' },
          { role: 'user', content: text }
        ],
        temperature: 0.3
      })
    });
    const data = await res.json();
    result.textContent = data.choices[0].message.content;
    const history = JSON.parse(localStorage.getItem('puti_mirror_history') || '[]');
    history.unshift({ text: text.substring(0, 50), analysis: result.textContent, time: new Date().toLocaleString() });
    localStorage.setItem('puti_mirror_history', JSON.stringify(history));
  } catch(e) {
    result.textContent = '照见失败：' + e.message;
  }
};