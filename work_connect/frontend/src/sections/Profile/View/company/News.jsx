import { Helmet } from "react-helmet-async";

import { SpecialCompanyNewsView } from "./SpecialCompanyNews";

// ----------------------------------------------------------------------

export default function CompanyNewsPage() {
  return (
    <>
      <Helmet>
        <title> ニュース | Work&Connect </title>
      </Helmet>

      <SpecialCompanyNewsView />
    </>
  );
}
