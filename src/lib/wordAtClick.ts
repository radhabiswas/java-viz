/** Identifier under the pointer in a code block (for go-to-definition). */
export function wordAtClick(clientX: number, clientY: number, doc: Document): string | null {
  let node: Node | null = null;
  let offset = 0;

  const anyDoc = doc as Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };

  if (typeof anyDoc.caretPositionFromPoint === 'function') {
    const pos = anyDoc.caretPositionFromPoint(clientX, clientY);
    if (pos?.offsetNode?.nodeType === Node.TEXT_NODE) {
      node = pos.offsetNode;
      offset = pos.offset;
    }
  } else if (typeof anyDoc.caretRangeFromPoint === 'function') {
    const r = anyDoc.caretRangeFromPoint(clientX, clientY);
    if (r?.startContainer.nodeType === Node.TEXT_NODE) {
      node = r.startContainer;
      offset = r.startOffset;
    }
  }

  if (!node || node.nodeType !== Node.TEXT_NODE) return null;
  const text = node.textContent ?? '';
  let s = Math.min(offset, text.length);
  let e = Math.min(offset, text.length);
  while (s > 0 && /[A-Za-z0-9_]/.test(text[s - 1])) s--;
  while (e < text.length && /[A-Za-z0-9_]/.test(text[e])) e++;
  const w = text.slice(s, e);
  return w.length > 0 ? w : null;
}

export function codeLineElementId(fileName: string, lineIndex: number): string {
  const safe = fileName.replace(/[^a-zA-Z0-9]+/g, '_');
  return `cvln_${safe}_${lineIndex}`;
}
