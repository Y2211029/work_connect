import { Helmet } from "react-helmet-async";
import NavTabs from "../sections/InternshipJobOffer/newsSelect-view";



// ----------------------------------------------------------------------

export default function InternshipJobOfferPage() {
  return (
    <>
      <Helmet>
        <title> ニュース一覧 | Work&Connect </title>
      </Helmet>

      <NavTabs />
    </>
  );
}
