import { useRouter } from 'next/router';

const SinglePortfolio = () => {
  const router = useRouter();
  console.log('router=>', router);
  console.log('pathname=>', router.pathname);
  console.log('query=>', router.query.portfolioId);

  // send a request to some backend server
  // to fetch the piece of data with an id of router.query.portfolioId
  return (
    <div>
      <h1>Single Portfolio</h1>
    </div>
  );
};

export default SinglePortfolio;
