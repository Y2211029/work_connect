import { Helmet } from "react-helmet-async";

import { InternshipJobOfferView } from "../sections/InternshipJobOffer";

// ----------------------------------------------------------------------

export default function InternshipJobOfferPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <InternshipJobOfferView />
    </>
  );
}
