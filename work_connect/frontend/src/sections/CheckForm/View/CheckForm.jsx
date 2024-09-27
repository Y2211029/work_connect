import { Helmet } from "react-helmet-async";

import CheckFormView from "./CheckForm-view";

// ----------------------------------------------------------------------

export default function CheckFormPage() {
  return (
    <>
      <Helmet>
        <title> フォームをチェックする | Minimal UI </title>
      </Helmet>


      <CheckFormView />
    </>
  );
}
