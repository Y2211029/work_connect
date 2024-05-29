import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import BlogPage from "./components/BlogPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {

  const [value,setValue] = useState([]);

  // 先ほど作成したLaravelのAPIのURL
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
    // <div className="App">
    //   {value.map((article)=>{
    //     return (
    //       <div key={article.id}>
    //         <h1>{article.title}</h1>
    //         <p>{article.content}</p>
    //       </div>
    //     );
    //   })}
    // </div>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<BlogPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
