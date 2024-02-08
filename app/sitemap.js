export default function sitemap() {
    const url = process.env.CLIENT_URL;

    return [
      {
        url: url,
        lastModified: new Date(),
        priority: 1,
      },
      {
        url: `${url}about`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${url}map`,
        lastModified: new Date(),
        priority: 0.5,
      },
      {
        url: `${url}catalog`,
        lastModified: new Date(),
      },
    ]
  }