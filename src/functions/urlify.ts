const urlify = (content: string) => {
  const regex = /(((https?:\/\/)|(www\.))[^\s]+)/g
  if (!content) return ''
  return content.replace(regex, (url) => {
    return `<a href="${url}" rel="noreferrer" target="_blank">${url}</a>`
  })
}

export default urlify
