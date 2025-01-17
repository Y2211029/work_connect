import { Helmet } from 'react-helmet-async';

import StudentOfList from '../sections/StudentList/StudentOfList';
// ----------------------------------------------------------------------

export default function studentListPage() {
  return (
    <>
      <Helmet>
        <title> 学生一覧 | Work&Connect </title>
      </Helmet>

      <StudentOfList/>
    </>
  );
}
