import { Helmet } from 'react-helmet-async';

import { StudentListView } from 'src/sections/StudentList/view';

// ----------------------------------------------------------------------

export default function studentListPage() {
  return (
    <>
      <Helmet>
        <title> 学生一覧 | Work&Connect </title>
      </Helmet>

      <StudentListView />
    </>
  );
}
