import { Helmet } from "react-helmet-async";
import SpecialCheckFormView from "./CheckForm/View/CheckForm-view"
// import SpecialCheckFormListView from "./CheckForm/View/CheckFormListView"
// import Profile from "./Profile";

// ----------------------------------------------------------------------

export default function SpecialFormsPage() {

  return (
    <>
      <Helmet>
        <title>応募フォーム一覧 | Minimal UI</title>
      </Helmet>

      {/* <Profile value={3} />
      <SpecialCheckFormListView /> */}
      <SpecialCheckFormView />
    </>
  );
}
