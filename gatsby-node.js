exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/thread/)) {
    page.matchPath = "/thread/*"
    createPage(page)
  }
}
