import Link from 'next/link';

const ClientsPage = () => {
  const clients = [
    {
      id: 'max',
      name: 'Maximilian',
    },

    {
      id: 'manu',
      name: 'Manuel',
    },
  ];
  return (
    <div>
      <h1>The Clients page</h1>

      <ul>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              {/* now we know how to use the link, now for longer paths
                  constructing a link destination line this by building
                  a string like this can be cambursome for annoying, 
                  that's why nextJS also gives us an alternative value
                  we can provide the href prop from the link  */}
              {/* <Link href={`/clients/${client.id}`}>{client.name}</Link> */}

              {/* instead of providing a string path we can provide an 
                  object with complete path name and concrete value */}

              <Link
                href={{
                  pathname: '/clients/[id]',
                  query: {
                    id: client.id,
                  },
                }}
              >
                {client.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientsPage;
