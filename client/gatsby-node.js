exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/tweet/)) {
    page.matchPath = "/tweet/*"
    createPage(page)
  }
}
