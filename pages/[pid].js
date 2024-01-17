import fs from 'fs/promises';
import path from 'path';

const ProductDetailsPage = (props) => {
  const { product } = props;

  // don't need this if fallback is set to 'blocking'
  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const json = await fs.readFile(filePath);
  const data = JSON.parse(json);

  const product = data.products.find((item) => item.id === productId);

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { pid: 'p1' },
      },
      // {
      //   params: { pid: 'p2' },
      // },
      // {
      //   params: { pid: 'p3' },
      // },
    ],

    /**
     * fallback false:
     * This one is simple: only pages that are generated during
     * next build (i.e. returned from the paths property of
     * getStaticPaths) will be visible.
     *
     * E.g., if a user creates a new blog page at /post/[post-id],
     * it will not be immediately visible afterwards, and visiting
     * that URL will lead to a 404.
     *
     * That new post will only become visible if you re-run next build,
     * and getStaticPaths returns that page under paths, which is the
     * case for the typical use case where getStaticPaths returns all
     * the possible [post-id].
     */

    /**
     *
     * What's up with this fallback key here?
     * The fallback key can help if you have a lot of
     * pages that would need to be pre-generated here
     * i only have three dummy products in json file
     * and i'm currently not even fetching that data
     * from that file we'll do that later but we only
     * have three products now imagine that you have
     * like an amazon like website with millions of
     * products of-course pre-generating all those
     * products like this might not be optimal not just
     * because i hard coded this here, we could fetch this
     * dynamically from dummy json file, pre-generating
     * all those millions of pages might take super long
     * and there might be products suppose if you are
     * building a blog and you have hundreds of articles
     * you might have some articles which are basically
     * never read so then, pre-generating such rarely
     * visited pages is a waste-of-time and resources that's
     * where fallback becomes important here we can set this
     * to true and then for example we could decide to only
     * pre-render some pages so let's say we wanna pre-render
     * the page with product id one because that's a highly
     * frequented page, it's visited very often but we don't
     * wanna pre-generate the other two pages with fallback
     * set to true, that's possible because now if i save this
     * and remove two more keys, you will notice that if go
     * back to home screen if i click on product three we still
     * load this page successfully even though it was not added
     * to paths list and the reason for that is that with fallback
     * set to true we tell next-js that even pages which are not
     * listed inside the paths list can be valid values that
     * should be loaded when they are visited but they are
     * not pre-generated instead they are generating in just-in-time
     * when a request reaches the server and that allows us
     * to pre-generate highly visited pages and postpone the
     * generation to less frequented pages to the server, so they
     * are only pre-generated when they are needed so that can
     * be a very useful behavior but you'll notice a problem here
     * if i don't click on a link here but instead i directly enter
     * p3 in the url and therefore send a new request to this page
     * we actually get an error, the reason for that is that this
     * pre-generation this dynamic pre-generation, when it's needed
     * does not finish instantly so therefore instead when using this
     * fallback feature you should be prepared to return a fallback
     * state in your component for example simply checking if not product
     * exist then show the loading spinner otherwise product data,
     * an alternative would be  that you don't need to set fallback
     * true or false but to a string with a value of 'blocking'  if you
     * do that then you don't even need that fallback loading spinner check
     * inside your component and hence we comment this out because then
     * next-js will actually wait for this page to fully pre-generated on
     * the server before it serves that so then it will take a little but
     * longer for the visitor of the page to get a response but the response
     * which is sent back will be finished
     *
     */

    // fallback: false,
    fallback: false,
  };
}

export default ProductDetailsPage;
