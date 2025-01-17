import { Helmet } from 'react-helmet-async';

import WorkOfList from '../sections/WorkList/WorkOfList';

// ----------------------------------------------------------------------

export default function workListPage() {
  return (
    <>
      <Helmet>  
        <title> 作品一覧 | Work&Connect </title>
      </Helmet>

      <WorkOfList/>
    </>
  );
}
