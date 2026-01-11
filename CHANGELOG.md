# Changelog

## [1.1.0] - 2026-01-10

### Changed
- **Migrated to Manifest V3** - Updated from Manifest V2 to V3 for Chrome Web Store compliance
  - Changed from background scripts to service worker
  - Replaced `chrome.tabs.executeScript` with `chrome.scripting.executeScript`
  - Added `scripting` permission required by MV3

### Fixed
- **HTML entity encoding bug** - Fixed double-encoding issue by replacing `&` before other entities
- **Removed duplicate replacement** - Removed duplicate single-quote replacement in `htmlEntityEncode`

### Security
- Added whitelist validation for menu item IDs
- Added validation for tab presence before script injection
- Added user-facing error notification when clipboard operations fail

### Added
- Properly sized extension icons (16x16, 48x48, 128x128)
- Privacy policy (`PRIVACY.md`) for Chrome Web Store submission
- UTF-8 support for base64 encoding using TextEncoder

## [1.0.0] - Initial Release

### Added
- Context menu integration for text selection
- Base64 encoding
- URL encoding
- JSON escaping
- HTML entity encoding
- Clipboard copy with notification feedback
