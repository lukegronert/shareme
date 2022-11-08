export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`

  return query;
}

export const searchQuery = (searchTerm) => {
  // Sanity query language 
  // * means all of your files stored on sanity
  // title, category, and about are properties of the document
  // the object after the query is full of properties we want returned
  // the first level are properties of the pin
  // The nested ones after postedBy are properties of postedBy because that is a separate document
  const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`

  return query;
}

export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`