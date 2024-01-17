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

// *** function to get data from dummy-data.json file **** //
async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const json = await fs.readFile(filePath);
  const data = JSON.parse(json);

  return data;
}

/**
 *
 * - Let's take another look at the notFound case that we're
 * trying to request a page which does not exist and let's
 * start by simply visiting a page with product id of p4 and
 * now we get a 404 error page here so a not found page because
 * in our data we only have the id's p1, p2 and p3 there is
 * no product with the id of p4 now we get this not found error
 * because in getStaticPaths we load and build our array of ids
 * or params for which pages should be generated from that
 * dummy json file so pathIds here in the end is an array where
 * we only configure param pairs so pid value pairs for the
 * values p1,p2,p3 since these are the only ids that exist in
 * that dummy json file and automatically if we then try to load
 * this page for an id which was not pre-generated we do get this
 * 404 error now that make sense.
 *
 * - What if we use fallback true though what if we for example
 * assume that the products stored in dummy json file might not
 * be all the products for which we are able to fetch data so we
 * only generate pages for the three product ids we find in that
 * file because we go through that file here in getStaticPaths
 * but by setting fallback to true we then also tell next-js that
 * even if an id value is not found here we still might be able
 * to render a page that's what the idea behind fallback, that
 * we don't have to predefine all possible pages all possible
 * values for the dynamic segment so therefore if set fallback
 * to true here we will see that if i visit p4 we see loading
 * but then after a while we get another error `failed to load
 * static props` and this hopefully also makes sense i'm trying
 * to load this product page for id of p4 for which we just don't
 * have any data because in getStaticProps we are also reaching out
 * to dummy json file and we're trying to find our product by id
 * in that file and we won't find a product with id p4 in that
 * file so we see loading initially as a fallback but then next-js
 * tries to load the actual data for this page and it just fails
 * there because we don't have such a product so that'w why we
 * get this error eventually here then because it failed to
 * load the actual data now that is a perfect example for setting
 * the notFound property on the object we returned in getStaticProps
 *
 */

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((item) => item.id === productId);

  // here we also wanna check if we don't have a product
  // so if we failed to find a product for the given id
  // then we want to return an object where notFound is
  // set to true by setting this we are able to use fallback
  // to true and try to find a product for a parameter value
  // which is not pre-defined in the paths array and if we
  // then still fail to fetch it we don't want to return to
  // regular page with the missing data, which cases an error
  // but we then wanna show the not found the 404 error page
  // instead.

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const pathIds = data.products.map((item) => ({
    params: {
      pid: item.id,
    },
  }));

  return {
    paths: pathIds,
    fallback: true,
  };
}

export default ProductDetailsPage;
