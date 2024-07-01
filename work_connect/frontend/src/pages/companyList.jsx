import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/CompanyList/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
