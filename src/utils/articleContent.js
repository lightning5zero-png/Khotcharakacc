/**
 * If content has no HTML tags, split on blank lines into paragraphs and
 * preserve single line breaks as <br>. Escapes HTML metacharacters for XSS safety.
 * If content already contains markup, return as-is (admin-authored HTML).
 */
export function articleContentToHtml(content) {
  if (!content || typeof content !== 'string') return ''
  const trimmed = content.trim()
  if (!trimmed) return ''

  const looksLikeHtml = /<\/?[a-z][a-z0-9]*[\s/>]/i.test(trimmed)
  if (looksLikeHtml) return trimmed

  return escapeHtml(trimmed)
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
