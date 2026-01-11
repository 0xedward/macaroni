# Macaroni
<p align=center>
  <img alt="Macaroni Chrome Extension Icon" src="src/assets/icon.png"/ width="200px" height="200px"><br>
  <b>Encoding at the speed of copypasta</b>
</p>

<p align=center>
  <a href="https://chrome.google.com/webstore/detail/macaroni/okpaeidpoafcnohfekdhnfedcaaoajmg"><img alt="Macaroni Chrome Web Store link" src="https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png"/></a>
  <br>
  <img alt="Extension version deployed to Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/okpaeidpoafcnohfekdhnfedcaaoajmg?label=Chrome%20web%20store%20version%20"/>
  <img alt="Number of Extension Users" src="https://img.shields.io/chrome-web-store/users/okpaeidpoafcnohfekdhnfedcaaoajmg?color=2379C83D"/>
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
If you are curious or concerned about [the permissions requested by this extension](https://github.com/0xedward/macaroni/blob/main/src/manifest.json), the following is a brief explainer for each permission:

- `contextMenus` - Creates menu items for you to specify which encoding you want copied to your clipboard for the text you have selected
- `notifications` - Sends you notifications when your selected text has been encoded and copied to your clipboard
- `activeTab` - Allows the extension to access the current tab only when you invoke it via the context menu
- `scripting` - Required by Manifest V3 to inject the clipboard write function into the page
- `clipboardWrite` - Allows the extension to write the encoded text to your clipboard

## Credits
The extension [icon](https://thenounproject.com/search/?q=macaroni&i=1723765) was found on The Noun Project and was created by mikicon
