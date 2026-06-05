// Lightweight, single-pass highlighter for HTL / HTML / Java-ish snippets.
// Returns an HTML string (already escaped) with token <span>s. No nesting bugs:
// one regex alternation, leftmost match wins, every char is escaped.
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function highlight(raw, lang) {
  if (lang && /^(java|xml|json|bash|sh|js|javascript|css|scss|sass)$/i.test(lang)) {
    return highlightGeneric(raw);
  }
  // HTL / HTML
  var re = /(<!--[\s\S]*?-->)|(\$\{[^}]*\})|(\bdata-sly-[\w.]+)|('[^']*')/g;
  var out = '', last = 0, m;
  while ((m = re.exec(raw))) {
    out += escapeHtml(raw.slice(last, m.index));
    var cls = m[1] ? 'tok-cmt' : m[2] ? 'tok-expr' : m[3] ? 'tok-attr' : 'tok-str';
    out += '<span class="' + cls + '">' + escapeHtml(m[0]) + '</span>';
    last = re.lastIndex;
  }
  out += escapeHtml(raw.slice(last));
  return out;
}

function highlightGeneric(raw) {
  var re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)|("[^"]*"|'[^']*')|(@\w+)|(\b(?:public|private|protected|class|interface|void|return|new|import|package|final|static|boolean|int|String|List|Map|true|false|null|const|let|var|function|if|else|for|while)\b)/g;
  var out = '', last = 0, m;
  while ((m = re.exec(raw))) {
    out += escapeHtml(raw.slice(last, m.index));
    var cls = m[1] ? 'tok-cmt' : m[2] ? 'tok-str' : m[3] ? 'tok-attr' : 'tok-kw';
    out += '<span class="' + cls + '">' + escapeHtml(m[0]) + '</span>';
    last = re.lastIndex;
  }
  out += escapeHtml(raw.slice(last));
  return out;
}
