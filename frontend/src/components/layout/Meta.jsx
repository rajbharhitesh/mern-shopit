import { Helmet } from 'react-helmet-async';

const Meta = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - ShopIt`}</title>
    </Helmet>
  );
};

export default Meta;
