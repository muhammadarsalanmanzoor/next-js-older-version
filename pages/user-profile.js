/**
 *
 * In getServerSideProps function return Object is
 * same as we use getStaticProps function but one
 * thing we can return from getServerSideProps function
 * which is `revalidate` property that can't be set here
 * because getServerSideProps per definition runs for
 * every incoming request so there is no need to revalidate
 * after certain amount of seconds because it will always
 * run again, this function will not be called in advanced
 * when we build the project but really for every incoming
 * request. if you have highly dynamic data which changes
 * multiple times every second and using it very simple you
 * can still write any server side code in there you can
 * still reach out the dummy json file as we did it before
 * and you still return the props for the component function
 * at the end. The only key difference is the kind of data
 * you get access in the context and the timing of this function.
 */

/**
 *
 * So which implications does getServerSideProps running on
 * the server only have for us, the implications can be
 * found in the context object unlike context in getStaticProps
 * we don't just have access to the params and the couple of
 * other less important fields, instead we get access to the
 * full request object as well and also to the response which
 * will be sent back so that we could even manipulate this and
 * add extra headers if you wanted to,
 *
 */

/**
 *
 * Now getServerSideProps can sometimes be useful, i also want
 * to mention how you would use it with a dynamic page. Here
 * before, when we used getStaticProps we also needed getStaticPaths
 * to let next-js know which instances of this page should be
 * pre-generated, now when using getServerSideProps that's not the
 * case if i do have a [uid].js file so that i have a dynamic page
 * for a single user foe different user id's if we use getServerSideProps
 * we don't need and we can't use getStaticPaths
 *
 */

function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  // req and res the objects we're getting here are
  // the official nodejs default incoming message and
  // response objects and getting access this type of
  // data sometimes important if you for example needs
  // special header or cookie data , now we don't need
  // this at that time but it will become more important
  // later once we talk about authentication

  console.log('REQUEST=>', req);
  console.log('RESPONSE=>', res);

  return {
    props: {
      username: 'max',
    },
  };
}

export default UserProfilePage;
