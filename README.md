# Macaroni
**Encoding at the speed of copypasta**

Macaroni is a Chrome extension to help you quickly copy text you select as one of the following encodings:
  - [base64](https://en.wikipedia.org/wiki/Base64)
  - [URL encoding](https://en.wikipedia.org/wiki/Percent-encoding)
  - [HTML entity encoding](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references)
  - [JSON escaping](https://en.wikipedia.org/wiki/Escape_character#JavaScript)

## Installing extension from repo
1. Download this repo as a ZIP file from GitHub.
2. Unzip the file
3. In Chrome, go to the extensions page - chrome://extensions
4. Enable Developer Mode.
5. Click Load unpacked button and select the src folder that was extracted or drag the extracted src folder anywhere on the page to import it

## Permissions Audit
If you are curious or concerned about the permissions requested by this extension, the following is a brief explainer for each permission and where you can find it used in code:

- `contextMenus` is used [to create a menu items for you to specify which encoding you want copied to your clipboard for the text you have selected](https://github.com/0xedward/macaroni/blob/main/src/background.js#L4-L26)
