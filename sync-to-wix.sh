#!/usr/bin/env bash
# Copy the Blastoff! custom element into a cloned Wix site repo.
#
#   ./sync-to-wix.sh ~/code/ukssc-site
#
# Kept as a copy step rather than a second checked-in copy of the file, so the
# source here stays the single place the component is edited.
set -euo pipefail

REPO="${1:-}"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$REPO" ]; then
  echo "usage: ./sync-to-wix.sh /path/to/your-wix-site-repo" >&2
  exit 1
fi

if [ ! -f "$REPO/wix.config.json" ]; then
  echo "error: '$REPO' has no wix.config.json, so it is not a Wix site repo." >&2
  echo "       Clone the repo Wix created for you, then point this script at it." >&2
  exit 1
fi

DEST="$REPO/src/public/custom-elements"
mkdir -p "$DEST"
cp "$SRC_DIR/blastoff-element.js" "$DEST/blastoff-element.js"

echo "✓ blastoff-element.js -> src/public/custom-elements/"
echo
echo "Next:"
echo "  cd \"$REPO\""
echo "  git add src/public/custom-elements/blastoff-element.js"
echo "  git commit -m 'Add Blastoff! 2026 landing section'"
echo "  git push"
echo "  wix publish     # deploys; 'git push' alone does not go live"
