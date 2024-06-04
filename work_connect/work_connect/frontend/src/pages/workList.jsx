import { Helmet } from 'react-helmet-async';

import { AppView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> 作品一覧 | Work&Connect </title>
      </Helmet>

      <AppView />
    </>
  );
}
