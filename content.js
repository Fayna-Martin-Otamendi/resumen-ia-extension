// content.js

// Esta función se ejecuta cuando el usuario hace clic en el botón de la extensión
function extractTextFromPage() {
    // Obtener todo el texto visible en la página
    return document.body.innerText;
  }
  
  // Esta es la función que se ejecutará cuando la extensión se active
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'extract') {
      sendResponse({ text: extractTextFromPage() });
    }
  });
  