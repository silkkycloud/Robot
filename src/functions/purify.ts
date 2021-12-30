import DOMPurify from 'dompurify'

export const purifyHTML = (html: string) => {
  return DOMPurify.sanitize(html)
}
