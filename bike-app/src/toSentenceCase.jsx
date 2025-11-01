export default function toSentenceCase(str) {
  return str.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}
