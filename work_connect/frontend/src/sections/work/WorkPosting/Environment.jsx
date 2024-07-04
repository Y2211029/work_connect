import CreatableSelect from 'react-select/creatable';

const options = [
  { value: '旅行', label: '総合政策学部' },
  { value: '読書', label: '経済学部' },
  { value: 'ドライブ', label: '経営学部' },  
  { value: '映画鑑賞', label: '商学部' },
  { value: '筋トレ', label: '社会学部' },
  { value: 'カラオケ', label: '観光学部' },  
  { value: 'スポーツ観戦', label: '国際関係学部' },
  { value: 'ゲーム', label: '国際文化学部' },
  { value: 'プログラミング', label: '国際教養学部' },  
  { value: 'DIY', label: '文学部' },
  { value: '釣り', label: '人間科学部' },  
  { value: '料理', label: '外国語学部' },
  { value: 'ツーリング', label: '教育学部' },
  { value: '音楽鑑賞', label: '子ども学部' },  
  { value: 'プログラミング', label: '社会福祉学部' },  
  { value: 'DIY', label: '家政学部' },
  { value: '釣り', label: '芸術学部' },  
  { value: '料理', label: ' 体育学部' },
  { value: 'ツーリング', label: '健康科学部' },
  { value: '音楽鑑賞', label: '教養学部' },  
  { value: 'プログラミング', label: '理学部' },  
  { value: 'DIY', label: '工学部' },
  { value: '釣り', label: '農学部' },  
  { value: '料理', label: ' 水産学部' },
  { value: 'ツーリング', label: '獣医学部' },
  { value: '音楽鑑賞', label: '医学部' },  
  { value: '音楽鑑賞', label: '歯学部' },  
  { value: '音楽鑑賞', label: '薬学部' },  
  { value: '音楽鑑賞', label: '看護学部' },  
  { value: '音楽鑑賞', label: '保健学部' },  
  { value: '音楽鑑賞', label: '医療技術学部' },  
]

const MyCreatableSelect = () => <CreatableSelect options={options} isClearable isMulti />;

MyCreatableSelect.displayName = 'MyCreatableSelect';

export default MyCreatableSelect;