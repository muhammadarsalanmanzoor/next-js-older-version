import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

/**
 * So, now we had a look at getStaticProps and getStaticPaths
 * and these two are working together you don't always need
 * both in the case of index.js, we only needed getStaticProps
 * but for dynamic pages that should be pre-generated you do
 * need both, now you might recall that earlier in this module
 * at the beginning of this course section we talk about two
 * forms of pre-rendering static generation and server side
 * rendering, now what we had a look at thus far that's static
 * generation because we statically pre-generate pages even though
 * it is not fully static because of incremental static generation
 * which we also learned but generally pages are pre-generated and
 * that is really important inside of getStaticProps and also inside
 * of getStaticPaths we don't have access to the actual request
 * which is incoming because these function are not called for the
 * actual request, at least not only with incremental static
 * generation they are also called for incoming requests at least
 * some times if they need to be re-validated  but they are generally
 * called when your project is built with `npm run build` so inside
 * of getStaticProps you don't have access the actual incoming
 * request and sometimes static generation is not enough and instead
 * you need real server side rendering which means you do need to
 * pre-render a page for every incoming request, so not at most
 * every second but really for every incoming request and/or you
 * need access to the concrete request object that is reaching the
 * server because for example you need to extract cookies, the
 * idea is simple next-js also supports this run real server side
 * code use-case which means it gives you a function which you can
 * add to your page component files which is then really executed
 * whenever a request for this page reaches the server so that's
 * then not pre-generated in advance during build time but it's
 * really code that runs on the server only so only after you
 * deployed it and which is then re-executed for every incoming
 * request and that code is added to a function called `getServerSideProps`
 * just like `getStaticProps`, it's a async function and you can
 * only add it to your page component files but then if you do
 * have such a function in a page component file next-js will execute
 * that function and it will execute it whenever a request for this page
 * is made and therefore you should only use either getStaticProps what
 * we saw thus far or getServerSideProps because they kind of clash, they
 * fulfill the same purpose, they get props for the component so that next-js
 * is then able to render that component but they run at different points
 * of time
 *
 */

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => {
        return (
          <Link href={`/products/${product.id}`} key={product.id}>
            <li>{product.title}</li>
          </Link>
        );
      })}
    </ul>
  );
}

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
