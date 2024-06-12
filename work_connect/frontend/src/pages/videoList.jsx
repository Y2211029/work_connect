import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function VideoList() {
  return (
    <>
      <Helmet>
        <title> 動画一覧 | Work&Connect </title>
      </Helmet>

      <AppView />
    </>
  );
}
