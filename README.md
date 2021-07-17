# Macaroni
<p align=center>
  <img alt="Macaroni Chrome Extension Icon" src="src/assets/icon.png"/ width="200px" height="200px"><br>
  <b>Encoding at the speed of copypasta</b>
</p>

Macaroni is a Chrome extension to help you quickly copy text you select as one of the following encodings:
  - [base64](https://en.wikipedia.org/wiki/Base64)
  - [URL encoding](https://en.wikipedia.org/wiki/Percent-encoding)
  - [HTML entity encoding](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references)
  - [JSON escaping](https://en.wikipedia.org/wiki/Escape_character#JavaScript)

This extension was created for security testing, so the encoded data it produces should not be used in a trusted context.

## Installing extension from repo
1. Download this repo as a ZIP file from GitHub.
2. Unzip the file
3. In Chrome, go to the extensions page - chrome://extensions
4. Enable Developer Mode.
5. Click Load unpacked button and select the src folder that was extracted or drag the extracted src folder anywhere on the page to import it

## Permissions Audit
If you are curious or concerned about [the permissions requested by this extension](https://github.com/0xedward/macaroni/blob/main/src/manifest.json#L10-L14), the following is a brief explainer for each permission and where you can find it used in code:

- `contextMenus` is used [to create a menu items for you to specify which encoding you want copied to your clipboard for the text you have selected](https://github.com/0xedward/macaroni/blob/main/src/background.js#L4-L26)
- `notifications` is used to send you notifications for when your selected text has been encoded and copied to your clipboard
- `tabs` is used [to get the text you selected to pass to the encoder or decoder](https://github.com/0xedward/macaroni/blob/main/src/background.js#L32-L35). `tabs`, and permissions to `http://*/` and `https://*/` are a workarounds for a [Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=116429) with `chrome.contextMenus` API causing line breaks and new lines to not appear in `selectionText`

## Credits
The extension [icon](https://thenounproject.com/search/?q=macaroni&i=1723765) was found on The Noun Project and was created by mikicon
