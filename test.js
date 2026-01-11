// Test the encoding functions from background.js

// Polyfill btoa for older Node versions
const btoa = (str) => Buffer.from(str, 'binary').toString('base64');

// Copy the functions for testing
function base64Encode(text) {
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

function jsonEscape(text) {
  const json = JSON.stringify(text, null, 2);
  const jsStringLiteral = JSON.stringify(json).slice(1, -1);
  return jsStringLiteral;
}

function htmlEntityEncode(text) {
  const htmlEntityEncodedString = text
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#039;');
  return htmlEntityEncodedString;
}

// Test cases
const tests = [
  // Base64 tests
  { fn: base64Encode, input: 'Hello World', expected: 'SGVsbG8gV29ybGQ=', name: 'base64: Hello World' },
  { fn: base64Encode, input: 'test', expected: 'dGVzdA==', name: 'base64: test' },
  { fn: base64Encode, input: '日本語', expected: '5pel5pys6Kqe', name: 'base64: UTF-8 (Japanese)' },

  // URL encoding tests
  { fn: urlEncode, input: 'hello world', expected: 'hello%20world', name: 'urlEncode: space' },
  { fn: urlEncode, input: "test'value", expected: 'test%27value', name: 'urlEncode: single quote' },
  { fn: urlEncode, input: 'a=b&c=d', expected: 'a%3Db%26c%3Dd', name: 'urlEncode: special chars' },

  // JSON escape tests
  { fn: jsonEscape, input: 'hello\nworld', expected: '\\"hello\\\\nworld\\"', name: 'jsonEscape: newline' },
  { fn: jsonEscape, input: 'tab\there', expected: '\\"tab\\\\there\\"', name: 'jsonEscape: tab' },

  // HTML entity tests
  { fn: htmlEntityEncode, input: '<script>', expected: '&lt;script&gt;', name: 'htmlEntity: script tag' },
  { fn: htmlEntityEncode, input: '&amp;', expected: '&amp;amp;', name: 'htmlEntity: ampersand' },
  { fn: htmlEntityEncode, input: '"quotes"', expected: '&quot;quotes&quot;', name: 'htmlEntity: quotes' },
  { fn: htmlEntityEncode, input: "it's", expected: 'it&#039;s', name: 'htmlEntity: apostrophe' },
];

let passed = 0;
let failed = 0;

console.log('Running encoding function tests...\n');

for (const test of tests) {
  const result = test.fn(test.input);
  if (result === test.expected) {
    console.log(`✓ PASS: ${test.name}`);
    passed++;
  } else {
    console.log(`✗ FAIL: ${test.name}`);
    console.log(`  Input:    "${test.input}"`);
    console.log(`  Expected: "${test.expected}"`);
    console.log(`  Got:      "${result}"`);
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
