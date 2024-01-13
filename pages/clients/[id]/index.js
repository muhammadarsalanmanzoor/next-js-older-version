import { useRouter } from 'next/router';

const SingleClientProjectsPage = () => {
  const router = useRouter();

  function loadProjectHandler(projectId) {
    // load data...
    // using router.push is like using the Link component
    // just programmatically

    // router.push('/clients/max/project-a');

    // we can also no just pass in a string, but again
    // just as before for the link we can also pass in an
    // object then we set pathname and query

    router.push({
      pathname: '/clients/[id]/[clientProjectId]',
      query: {
        id: router.query.id,
        clientProjectId: projectId,
      },
    });

    // if we use router.replace instead of push then we
    // replace the current page with that one which means
    // we can't go back after the navigation
  }

  return (
    <div>
      <h1>{router.query.id} Projects</h1>

      {/* Navigating programmatically */}
      <button onClick={() => loadProjectHandler('Project A')}>
        Load Project A
      </button>
      <button onClick={() => loadProjectHandler('Project B')}>
        Load Project B
      </button>
    </div>
  );
};

export default SingleClientProjectsPage;
