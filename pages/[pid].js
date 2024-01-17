import fs from 'fs/promises';
import path from 'path';

const ProductDetailsPage = (props) => {
  const { product } = props;

  // don't need this if fallback is set to 'blocking'
  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
};

// *** function to get data from dummy-data.json file **** //
async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const json = await fs.readFile(filePath);
  const data = JSON.parse(json);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((item) => item.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const pathIds = data.products.map((item) => ({
    params: {
      pid: item.id,
    },
  }));

  return {
    paths: pathIds,
    fallback: true,
  };
}

export default ProductDetailsPage;
