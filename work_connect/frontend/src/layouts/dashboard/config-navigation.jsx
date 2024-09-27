import ApartmentIcon from '@mui/icons-material/Apartment';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: '作品一覧',
    path: '/',
    icon: <TipsAndUpdatesOutlinedIcon />,
  },
  {
    title: '動画一覧',
    path: '/VideoList',
    icon: <VideoLibraryOutlinedIcon />,
  },
  {
    title: '学生一覧',
    path: '/StudentList',
    icon: icon('ic_student'),
  },
  {
    title: '企業一覧',
    path: '/CompanyList',
    icon: <ApartmentIcon />,
  },
  {
    title: 'ニュース一覧',
    path: '/Internship_JobOffer/joboffers',
    icon: <NewspaperOutlinedIcon />,
  },
  {
    title: '設定',
    path: '/Settings',
    icon: icon('ic_disabled'),
  },
<<<<<<< HEAD
=======
  {
    title: 'ニュースの投稿',
    path: '/Editor',
    icon: <StickyNote2Icon />,
  },
  {
    title: 'テストページ何か試したいものはここで',
    path: '/TestPage',
    icon: <StickyNote2Icon />,
  },
>>>>>>> 79cc4a73bb2a7c7c4a748ee845ec41314e645716
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
