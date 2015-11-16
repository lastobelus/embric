export default function pageDoesntHaveElement(context, query, message) {
  let match = context.$().find(query);
  message = message || `page should contain a "${query}"`;

  this.push(match.length === 0, match.length, query, message);
}
