import { Helmet } from 'react-helmet-async';

import { WriteFormView } from 'src/sections/WriteForm/view';

// ----------------------------------------------------------------------

export default function WriteFormPage() {

  return (
    <>
      <Helmet>
        <title> 応募する | Work&Connect </title>
      </Helmet>

      <WriteFormView />
    </>
  );
}
