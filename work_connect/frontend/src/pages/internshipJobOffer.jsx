import { Helmet } from "react-helmet-async";

import { InternshipJobOfferView } from "src/sections/InternshipJobOffer/view";


// ----------------------------------------------------------------------

export default function InternshipJobOfferPage() {
  return (
    <>
      <Helmet>
        <title> ニュース一覧 | Work&Connect </title>
      </Helmet>

      <InternshipJobOfferView />
    </>
  );
}
