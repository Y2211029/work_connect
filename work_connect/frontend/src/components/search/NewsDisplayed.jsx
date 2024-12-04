import { useEffect, useState } from "react";

const NewsDisplayed = () => {
  const [isNewsDisplayed, setIsNewsDisplayed] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get("page");

    if (pageParam === "JobOffer" || pageParam === "Internship" || pageParam === "Session") {
      setIsNewsDisplayed(true);
    } else {
      setIsNewsDisplayed(false);
    }
  }, [window.location.search]); // searchパラメータに基づいて再評価

  return isNewsDisplayed;
};

export default NewsDisplayed;
