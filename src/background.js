'use strict';

chrome.runtime.onInstalled.addListener( function() {
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


  chrome.contextMenus.onClicked.addListener(function(info) {
    if (typeof info != 'undefined') {
      // https://bugs.chromium.org/p/chromium/issues/detail?id=116429
      chrome.tabs.executeScript( {
        code: 'window.getSelection().toString();',
      }, function(selection) {
        const selectionText = selection[0];
        let resultString = '';
        switch (info.menuItemId) {
          case 'base64Encode':
            resultString = base64Encode(selectionText);
            break;
          case 'urlEncode':
            resultString = urlEncode(selectionText);
            break;
          case 'jsonEscape':
            resultString = jsonEscape(selectionText);
            break;
          case 'htmlEntityEncode':
            resultString = htmlEntityEncode(selectionText);
            break;
        }
        if (resultString !== '') {
          copyTextToClipboard(resultString);
          chrome.notifications.create('', {
            title: 'Macaroni',
            message: `Your selected text has been ${info.menuItemId}d and copied to your clipboard`,
            contextMessage: 'Pasta Delivery!',
            iconUrl: '../assets/icon.png',
            type: 'basic',
            priority: 2,
          });
        }
      });
    }
  });
},
);

// https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension/18455088#18455088
function copyTextToClipboard(text) {
  const copyFrom = document.createElement('textarea');
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy', false, null);
  document.body.removeChild(copyFrom);
}

function base64Encode(text) {
  return btoa(text);
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

// https://gist.github.com/mathiasbynens/d6e10171d44a59bb5664617c64ff2763
function jsonEscape(text) {
  const json = JSON.stringify(text, null, 2);
  const jsStringLiteral = JSON.stringify(json).slice(1, -1);
  return jsStringLiteral;
}

function htmlEntityEncode(text) {
  const htmlEntityEncodedString = text.replace(/"/g, '&quot;')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#039;')
      .replace(/'/g, '&#039;');
  return htmlEntityEncodedString;
}
