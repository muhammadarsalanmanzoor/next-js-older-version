import fs from 'fs/promises';
import path from 'path';

const ProductDetailsPage = (props) => {
  const { product } = props;

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const json = await fs.readFile(filePath);
  const data = JSON.parse(json);

  const product = data.products.find((item) => item.id === productId);

  return {
    props: {
      product,
    },
  };
}

export default ProductDetailsPage;
