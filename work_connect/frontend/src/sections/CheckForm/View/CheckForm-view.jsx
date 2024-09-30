import ListView from "src/components/view/list-view";
import { useParams } from 'react-router-dom';


const CheckFormListView = () => {
const { NewsId } = useParams();
  console.log(NewsId);
  return <ListView type="specialforms" NewsId={NewsId}/>;
};

export default CheckFormListView;
