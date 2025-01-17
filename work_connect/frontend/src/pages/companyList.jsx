import { Helmet } from 'react-helmet-async';
import CompanyOfList from '../sections/CompanyList/CompanyOfList';

// ----------------------------------------------------------------------

export default function CompanyListPage() {
  return (
    <>
      <Helmet>
        <title> 企業一覧 | Work&Connect </title>
      </Helmet>

      <CompanyOfList />
    </>
  );
}
