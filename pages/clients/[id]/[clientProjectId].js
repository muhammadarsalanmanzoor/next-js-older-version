import { useRouter } from 'next/router';

const SingleClientParticularProject = () => {
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h1>
        {router.query.id} - {router.query.clientProjectId}
      </h1>
    </div>
  );
};

export default SingleClientParticularProject;
