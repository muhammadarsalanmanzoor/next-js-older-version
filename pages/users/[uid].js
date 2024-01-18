function UserIdPage(props) {
  return (
    <div>
      <h1>User Id Page</h1>
      <h2>{props.id}</h2>
    </div>
  );
}

// this will work without adding getStaticPaths function.
// because this runs on the server only anyways, so next-js
// does not pre-generate any pages at all and therefore
// of course it also does not need to know which pages
// to pre-generate because there is no pre-generation.
// so unlike in the other case with getStaticProps where
// we do pre-generate pages and where we therefore for do
// need to tell next-js for which param values pages should
// be pre-generated with getServerSideProps that's simply
// not an issue because we run that server side code for
// every request anyways so there is no pre-generation and
// therefore no need to define those dynamic paths in advance.
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: 'userid-' + userId,
    },
  };
}

export default UserIdPage;
