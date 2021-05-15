
export const domParser = (template) => {
    return new window.DOMParser().parseFromString(
      template,
      'text/html'
    ).body.firstChild
  }