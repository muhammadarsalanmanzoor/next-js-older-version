import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => {
        return (
          <Link href={`/${product.id}`}>
            <li key={product.id}>{product.title}</li>
          </Link>
        );
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

/**
 *
 * When you run `npm run build` when you execute that prepared
 * script which executes next build then this getStaticProps code
 * executed, but it has one potential down side, what if you have
 * data that changes frequently because i mean, pre-generating
 * the pages sounds great if you're building something fairly
 * static, if you're building a blog, where data doesn't change
 * too often, then of course whenever you add a new blog post
 * you can just pre-generate your project again, you can run
 * `npm run build` again and then deploy the updated project,
 * But if you have data that changes frequently, if we add a
 * fourth product after the page was deployed, then we have to
 * rebuild and re-deploy the page all the time and that doesn't
 * sounds like a great thing todo, well next-js also has solution
 * for this.
 *
 * SOLUTION #1:
 *   -  You do pre-build your page but then you still include
 *      standard react code in your react components, where you
 *      use useEffect for then fetching updated data from a
 *      server, so you would always server back a page with
 *      some pre-rendered data but that data might be outdated
 *      so you fetch the latest data in the background and then
 *      update the loaded page after that data arrived, that's
 *      a pattern you could implement.
 *
 * SOLUTION #2:
 *  -  There is an alternative which often is better in solution#1
 *     This getStaticProps function as i mentioned does executes
 *     when you build your project with `npm run build` well that's
 *     not entirely true, it does executes there, but that is not
 *     necessarily the only time it executes, instead next-js has
 *     a built-in feature which is called incremental static
 *     generation, it means that you don't generate your page
 *     statically once at build time, but that it's continuously
 *     updated even after deployment without you re-deploying it,
 *     so you pre-generate a page but then you can also tell next-js
 *     that a given page should be re-generated again for every
 *     incoming requests at most every x seconds, so every 60 sec
 *     for example that means that if a request is made for a
 *     certain page and it's let's say less than 60 sec since
 *     it was last re-generated, the existing page would be
 *     served to the visitor but it's past those 60 sec and the
 *     amount of seconds then this page would be pre-generated to
 *     the server, and all you need to do unlock this in the
 *     return object which we returning inside the getStaticProps
 *     function you don't just return props but you also add a
 *     second key, which is called revalidate and as a value you
 *     set a number here which is the time in second that next-js
 *     should wait until it re-generate this page.
 *     Now during development, the page will be re-generated for
 *     every request, no matter what you enter revalidate value,
 *     in production this number will matter.
 *
 *
 */

/**
 *
 * Now before we explore more static functions next-js offers to
 * us and when we need them let's take another closer look at
 * getStaticProps, on getStaticProps function we pass a parameter
 * with the name of context, because indeed this function which
 * is called by next-js receives an argument, we just haven't used
 * it thus far but we do actually get an object here as our
 * argument as a parameter with some extra information about this
 * page, when it's executed by next-js, for example we would get
 * any dynamic parameters any dynamic path segment values, which
 * well see in a second, ignore it for now and we also get a
 * couple of other pieces of information which at the moment
 * though don't matter to us so let's ignore this param for now
 * we will see it in the next lectures, lets take a close
 * look at the return object again in there we see props and
 * revalidate now there are two other keys which you can
 * set on this object.
 *
 * notFound:
 *  - one key is the notFound key which wants
 *    a boolean value which is either true or false, if you set this
 *    to true this page will return a 404 error and rendered the 404
 *    error page instead of the normal page, now why might we want
 *    to do that, well if the code inside the function where you
 *    fetch data fails to fetch the data for whatever reason then
 *    you could for example, do that, so we could check data.products
 *    length is 0 then maybe we want to return an object with notFound
 *    set to be true so we show the not found page
 *
 * redirect:
 *  - Another key is
 *    the redirect key, the redirect key allows you to redirect the
 *    user so instead of rendering the page content you can redirect
 *    to another page content to another route and that could
 *    also be needed because maybe you failed to fetch data, let's
 *    say the problem is not that there is no data but instead you
 *    weren't able access the database or anything like that, so
 *    if there is not data to begin with then maybe you want to
 *    redirect with object and then set the key destination inside
 *    this with the value of some route.
 *
 */

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
 * of getStaticPaths  and we will see this in next branch
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
