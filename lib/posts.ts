import GhostContentAPI from "@tryghost/content-api"

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: "https://ghost.madatourism.com",
  key: "daf51cc1b76c1a1bbec8f36aa8",
  version: "v3",
})

export async function getPostsWithFilter(filter) {
  return await api.posts
    .browse({
      limit: "all",
      filter: `primary_tag:${filter}`,

      include: "tags",
    })

    .catch((err) => {
      console.error(err)
    })
}
export async function getPostsWithTagFilter(filter) {
  return await api.posts
    .browse({
      limit: "all",
      filter: `tag:${filter}`,
      fields: ["title", "slug", "id", "html"],
    })

    .catch((err) => {
      console.error(err)
    })
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug,

      include: "tags",
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
      include: "tags",
    })
    .catch((err) => {
      console.error(err)
    })
}
export async function getPostsNumber(number, tag) {
  return await api.posts
    .browse({
      limit: number,
      filter: `primary_tag:${tag}`,
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getPages() {
  return await api.pages
    .browse({
      limit: "all",
      fields: ["title", "slug", "id", "primary_tag"],
      include: "tags",
    })
    .catch((err) => {
      console.error(err)
    })
}
export async function getSinglePage(pageSlug) {
  return await api.pages
    .read({
      slug: pageSlug,
      fields: ["title", "slug"],
    })
    .catch((err) => {
      console.error(err)
    })
}
