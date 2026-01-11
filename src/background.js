'use strict';

// Create context menus on install
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    'id': 'base64Encode',
    'title': 'Copy as base64',
    'contexts': ['selection'],
  });

  chrome.contextMenus.create({
    'id': 'urlEncode',
    'title': 'Copy as URL encoded string',
    'contexts': ['selection'],
  });

  chrome.contextMenus.create({
    'id': 'jsonEscape',
    'title': 'Copy as JSON escaped string',
    'contexts': ['selection'],
  });

  chrome.contextMenus.create({
    'id': 'htmlEntityEncode',
    'title': 'Copy as HTML Entity encoded string',
    'contexts': ['selection'],
  });
});

// Mapping of menu item IDs to their encoding functions and display names
const ENCODINGS = {
  'base64Encode': {fn: base64Encode, name: 'base64 encoded'},
  'urlEncode': {fn: urlEncode, name: 'URL encoded'},
  'jsonEscape': {fn: jsonEscape, name: 'JSON escaped'},
  'htmlEntityEncode': {fn: htmlEntityEncode, name: 'HTML entity encoded'},
};

// Handle context menu clicks - must be at top level for MV3 service workers
chrome.contextMenus.onClicked.addListener(async function(info, tab) {
  // Validate required data is present
  if (!info || !info.selectionText || !tab || !tab.id) {
    return;
  }

  // Validate menuItemId against known encodings (security: whitelist check)
  const encoding = ENCODINGS[info.menuItemId];
  if (!encoding) {
    return;
  }

  const selectionText = info.selectionText;
  const resultString = encoding.fn(selectionText);

  if (resultString === '') {
    return;
  }

  // Inject script to copy to clipboard (service workers don't have DOM access)
  try {
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: copyToClipboard,
      args: [resultString],
    });

    chrome.notifications.create('', {
      title: 'Macaroni',
      message: `Your selected text has been ${encoding.name} and copied to your clipboard`,
      contextMessage: 'Pasta Delivery!',
      iconUrl: 'assets/icon-128.png',
      type: 'basic',
      priority: 2,
    });
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // Notify user of failure
    chrome.notifications.create('', {
      title: 'Macaroni',
      message: 'Failed to copy to clipboard. The page may not allow clipboard access.',
      iconUrl: 'assets/icon-128.png',
      type: 'basic',
      priority: 2,
    });
  }
});

// This function is injected into the page context
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

function base64Encode(text) {
  // Use TextEncoder for proper UTF-8 handling
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  let binary = '';
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i]);
  }
  return btoa(binary);
}

function urlEncode(text) {
  const urlEncodedString = encodeURIComponent(text)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  return urlEncodedString;
}

// https://gist.github.com/mathiasbynens/d6e10171d44a59bb5664617c64781763
function jsonEscape(text) {
  const json = JSON.stringify(text, null, 2);
  const jsStringLiteral = JSON.stringify(json).slice(1, -1);
  return jsStringLiteral;
}

function htmlEntityEncode(text) {
  // Note: & must be replaced first to avoid double-encoding
  const htmlEntityEncodedString = text
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#039;');
  return htmlEntityEncodedString;
}
