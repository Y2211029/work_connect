import { Helmet } from "react-helmet-async";
import SpecialCheckFormView from "./CheckForm/View/CheckForm-view"
// import SpecialCheckFormListView from "./CheckForm/checkFormListView"


// ----------------------------------------------------------------------

export default function SpecialFormsPage() {

  return (
    <>
      <Helmet>
        <title>応募フォーム一覧 | Minimal UI</title>
      </Helmet>

      <SpecialCheckFormView />
    </>
  );
}
