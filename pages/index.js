import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => {
        return (
          <Link href={`/${product.id}`} key={product.id}>
            <li>{product.title}</li>
          </Link>
        );
      })}
    </ul>
  );
}

/**
 *
 * In this project, which we have here, we currently have only
 * one page, the index.js page, now there we're rendering some
 * dummy product data, now that if our data would bit more
 * complex like every product also had a description let's
 * say and i'll keep this very simple, now adding description
 * key in dummy json file, now the idea could be in the index.js
 * file we render a list of products and every product is
 * a click able link which takes us to a detail page where
 * we then also see the description of the product and
 * for this we could add a new page with a dynamic segment
 * between square brackets and we name this pid and on this
 * page we show the product details and that data should now
 * be fetched from the dummy json file as well, now again
 * of course we could write standard react code, so to say
 * and use useEffect to send a HTTP request to some server
 * which might provide this product data but then we're back
 * in the world where that data is not there when this page
 * is initially rendered so search engines still wouldn't
 * see it so that's not what we'll do here instead what will
 * do here is we will again use getStaticProps functions and
 * here inside this function we will again reach out to the
 * dummy json file but now instead of returning all products
 * i want to read the file and only return one product from
 * that file that will be the difference and therefore of
 * course we need to know which product should be returned
 * here and of course that's something we can determine by
 * looking at the concrete value, which is in the URL, SO
 * the concrete value of the pid key that's where does
 * context parameter again becomes important because i did
 * briefly mention this before that we can use this context
 * parameter which is exposed to us by next-js to get hold
 * of the concrete param values so the concrete vales for
 * these dynamic segments in our paths we can access that
 * with params key in context which is exposed by next-js,
 * now after implementation of fetching product and make
 * a list clickable and then click a particular product
 * to move to dynamic route then it will throw an error
 * of getStaticPaths  - GO TO pid File and see notes
 *
 *
 */

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');

  const json = await fs.readFile(filePath);

  const data = JSON.parse(json);

  // if no database access is happens then this logic
  // runs
  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  // if something happen and data fetching fails then this logic
  // runs
  if (data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
