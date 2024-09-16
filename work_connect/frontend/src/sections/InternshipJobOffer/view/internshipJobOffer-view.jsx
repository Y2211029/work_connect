import { NewsSelectView } from "src/sections/InternshipJobOffer/view";
import ListView from "src/components/view/list-view";
import { useParams } from 'react-router-dom';

const InternshipJobOfferView = () => {
  const { Category } = useParams();
  console.log("カテゴリ",Category);
  //Categoryにはjoboffers or internships or blogsが入る
  return (
    <>
      <NewsSelectView />
      <ListView type={Category}/>
    </>
  );
};

export default InternshipJobOfferView;
