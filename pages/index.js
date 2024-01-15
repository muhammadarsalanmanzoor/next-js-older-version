import fs from 'fs/promises';
import path from 'path';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => {
        return <li key={product.id}>{product.title}</li>;
      })}
    </ul>
  );
}

/**
 * getStaticProps function can be added any page file
 * and you need to export it, when you do so then next-js
 * will also call this function on your behalf when it
 * pre-generates a page, and this function also signals
 * to next-js that this a page that should be pre-generated
 * we said that next-js would pre-render any page by default
 * and that's true, but we'll later learn about a way
 * of telling next-js to not pre-render a certain page.
 * It is important to understand that getStaticProps
 * will not tell next-js to not pre-render but instead
 * it's kind of confirm to next-js that this page still
 * should be pre-generated. But in addition to just
 * running through the component and returning the JSX
 * code next-js will then also call this getStaticProps
 * function if it finds one in your component page file.
 *
 * Now let's say we wanna load the dummy json data inside
 * data folder dynamically but not in the way, we would
 * do it in a standard react app with useEffect.
 *
 * We want to load data from the json file for the index.js
 * file but we don't wanna load it through a http request,
 * that's only sent from the client side after the page was
 * loaded, instead we wanna pre-fetch the data before we
 * create the HomePage component and before the component
 * page pre-rendered by next-js and that's exactly when we
 * export this getStaticProps function inside this current
 * file.
 *
 */

/**
 * getStaticProps:
 *    - It need's to be call exactly like getStaticProps.
 *    - This function returns a promise.
 *    - In this function you always needs to return an object.
 *    - An object that has a props key because the function is
 *      named getStaticProps and actually what this function
 *      does is it prepares the props for your component.
 *    - If you have getStaticProps function in your file
 *      NextJS First Execute this getStaticProps function
 *      and then in a second step execute the component
 *      function.
 *    - In this getStaticProps function you can run any code
 *      you want, code that will never be visible on the client
 *      side that fetches data and exposes data through props
 *      to this home page component.
 *    - NextJS is very clever and sees which imports you only
 *      use in getStaticProps and then those imports are
 *      basically stripped out of the client side code bundle,
 *      so code for the client side is prepared those imports
 *      will be not be part of it, that are used inside
 *      getStaticProps function and not used inside our component
 *      page.
 *
 */

export async function getStaticProps() {
  console.log('getStaticProps function');
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  console.log('filePath=>', filePath);

  const json = await fs.readFile(filePath);

  const data = JSON.parse(json);
  console.log('data=>', data);

  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
