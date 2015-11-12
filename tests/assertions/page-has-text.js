export default function pageHasText(context, text, message) {
  var matches = context.$().text().match(new RegExp(text));
  message = message || `page should contain "${text}"`;

  this.push(!!matches, matches, text, message);
}
