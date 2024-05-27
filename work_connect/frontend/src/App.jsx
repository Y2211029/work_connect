import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react'
import App2 from './components/test/test';
import axios from "axios";
import './App.css'


function App() {
  const [value, setValue] = useState([])
  const url = "http://localhost:8000/list";

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await axios.get(url);
        setValue(res.data.post);
        return;
      }catch (e){
        return e;
      }
    })();
  },[]);
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" />
        </Routes>
        <App2 />
      
    </Router>
    </>
  )
}

export default App
