export default async function sitemap() {
  const baseurl = process.env.CLIENT_URL;
  const api = process.env.API_URL;

  const products = await fetch(`${api}/products`).then((res) => res.json());

  const productsUrls = products.products.map((product) => ({
    url: `${baseurl}flower/${product._id}`,
    lastModified: product.createAt,
  }));

  return [
    {
      url: baseurl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseurl}aboutus`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseurl}map`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseurl}catalog`,
      lastModified: new Date(),
    },

    ...productsUrls,
  ];
}
