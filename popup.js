document.getElementById('summarizeBtn').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractTextFromPage,
    }, async (results) => {
      const pageText = results[0].result;
  
      const summary = await getSummaryFromAI(pageText);
      document.getElementById('summary').innerText = summary;
    });
  });
  
  function extractTextFromPage() {
    return document.body.innerText;
  }
  
  async function getSummaryFromAI(text) {
    const apiKey = 'TU_API_KEY_OPENAI';
  
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Eres un experto en comprensión de textos."
          },
          {
            role: "user",
            content: `Resume este contenido en español en pocas frases: ${text}`
          }
        ],
        temperature: 0.5
      })
    });
  
    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Error al generar resumen.';
  }
  