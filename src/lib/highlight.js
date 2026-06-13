// Lightweight, single-pass highlighter for HTL / HTML / Java-ish snippets.
// Returns an HTML string (already escaped) with token <span>s. No nesting bugs:
// one regex alternation, leftmost match wins, every char is escaped.
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function highlight(raw, lang) {
  if (lang && /^(css|scss|sass|less)$/i.test(lang)) {
    return highlightCss(raw);
  }
  if (lang && /^(java|xml|json|bash|sh|js|javascript)$/i.test(lang)) {
    return highlightGeneric(raw);
  }
  // HTL / HTML. Order matters (leftmost match wins, then alternative order):
  //  1 comment  2 ${expr}  3 <tag/</tag  4 data-sly-*  5 attr-name=  6 "str"/'str'
  // The double-quoted rule stops at ${ so HTL expressions inside attributes
  // still get the expression colour rather than being swallowed as a string.
  var re = /(<!--[\s\S]*?-->)|(\$\{[^}]*\})|(<\/?[a-zA-Z][\w-]*)|(\bdata-sly-[\w.]+)|([a-zA-Z_:][\w:.-]*(?==))|((?<!\})"(?:[^"$]|\$(?!\{))*"|'[^']*')/g;
  var out = '', last = 0, m;
  while ((m = re.exec(raw))) {
    out += escapeHtml(raw.slice(last, m.index));
    var cls = m[1] ? 'tok-cmt'
      : m[2] ? 'tok-expr'
      : m[3] ? 'tok-tag'
      : m[4] ? 'tok-attr'
      : m[5] ? 'tok-attr'
      : 'tok-str';
    out += '<span class="' + cls + '">' + escapeHtml(m[0]) + '</span>';
    last = re.lastIndex;
  }
  out += escapeHtml(raw.slice(last));
  return out;
}

function highlightCss(raw) {
  // 1 comment  2 #{interpolation}  3 string  4 $var  5 @rule  6 hex colour
  // (#{…} and #hex must be matched BEFORE any "#" could read as a comment)
  var re = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|(#\{[^}]*\})|("[^"]*"|'[^']*')|(\$[\w-]+)|(@[\w-]+)|(#[0-9a-fA-F]{3,8}\b)/g;
  var out = '', last = 0, m;
  while ((m = re.exec(raw))) {
    out += escapeHtml(raw.slice(last, m.index));
    var cls = m[1] ? 'tok-cmt'
      : m[2] ? 'tok-expr'
      : m[3] ? 'tok-str'
      : m[4] ? 'tok-attr'
      : m[5] ? 'tok-kw'
      : 'tok-str';
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
