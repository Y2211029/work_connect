import { Helmet } from 'react-helmet-async';
import VideoOfList from '../sections/VideoList/VideoOfList';

// ----------------------------------------------------------------------

export default function VideoListPage() {
  return (
    <>
      <Helmet>
        <title> 動画一覧 | Work&Connect </title>
      </Helmet>

      <VideoOfList />
    </>
  );
}
