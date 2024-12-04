import { Helmet } from 'react-helmet-async';

import { CompanyListView } from 'src/sections/CompanyList/view';

// ----------------------------------------------------------------------

export default function CompanyListPage() {
  return (
    <>
      <Helmet>
        <title> 企業一覧 | Work&Connect </title>
      </Helmet>

      <CompanyListView />
    </>
  );
}
