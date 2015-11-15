export default function pageHasElement(context, query, message) {
  var match = context.$().find(query);
  message = message || `page should contain a "${query}"`;

  this.push(match.length >= 1, match.length, query, message);
}
