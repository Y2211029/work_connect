import { Helmet } from 'react-helmet-async';

import { VideoListView } from 'src/sections/VideoList/view';

// ----------------------------------------------------------------------

export default function VideoList() {
  return (
    <>
      <Helmet>
        <title> 動画一覧 | Work&Connect </title>
      </Helmet>

      <VideoListView />
    </>
  );
}
