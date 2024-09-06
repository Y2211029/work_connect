import { Helmet } from "react-helmet-async";

import { SpecialCompanyNewsView } from "./SpecialCompanyNews";


// ----------------------------------------------------------------------

export default function InternshipJobOfferPage() {
  return (
    <>
      <Helmet>
        <title> News | Minimal UI </title>
      </Helmet>

      <SpecialCompanyNewsView />
    </>
  );
}
