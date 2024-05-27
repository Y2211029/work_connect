import React, { useEffect, useState } from "react";
import axios from "axios";

import LoginModal from '../login/LoginModal';

const App2 = () => {
  const [articles, setArticles] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [responseId, setResponseId] = useState(null);
  const [responseSurname, setResponseSurname] = useState(null);
  const [responseName, setResponseName] = useState(null);
  const [responseMail, setResponseMail] = useState(null);
  const [formValues, setFormValues] = useState({
    user_name: "",
  });
  const [csrfToken, setCsrfToken] = useState('');
  // const parser = new DOMParser();


  // 先ほど作成したLaravelのAPIのURL
  const csrf_url = "http://localhost:8000/csrf-token";
  const url = "http://localhost:8000/list";
  // const { decycle, encycle } = require('json-cyclic');

  const Name_textStyle = {
    fontWeight:'bold'
  };
  const Mail_textStyle = {
    color: '#33bb22' // ここで文字の色を設定します
  };
  // useEffect関数(importが必要)
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setArticles(res.data.post);
        setResponseId(res.data.id); // DBの対応するカラムをセット
        setResponseSurname(res.data.student_surname); // DBの対応するカラムをセット
        setResponseName(res.data.student_name); // DBの対応するカラムをセット
        setResponseMail(res.data.mail); // DBの対応するカラムをセット
        console.log(res.data.student_surname); // コンソールにログを出力
        console.log(res.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    async function fetchCsrfToken() {
      try {
        const response = await axios.get(csrf_url); // CSRFトークンを取得するAPIエンドポイント
        console.log(response.data.csrf_token); // ログ
        console.log('fetching CSRF token:OK'); // ログ
        const csrfToken = response.data.csrf_token;
        setCsrfToken(csrfToken); // 状態を更新
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    }
    fetchCsrfToken(); // ページがロードされた時点でCSRFトークンを取得
  }, []); // 空の依存配列を渡して、初回のみ実行するようにする

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // フォームの送信処理
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    ///////////////
    // try {
      
    //   console.log(""+document.getElementById('1').value);
    
      const inputValue = document.getElementById('1').value;
     
    //   const response = await axios.post(
    //     url, 
    //     { value: inputValue },
    //     {
    //         headers: {
    //             'X-CSRF-TOKEN': csrfToken
    //         }
    //     }
    // );
    //   console.log(response.data); // ログイン成功時の処理
    // } catch (error) {
    //   console.error(error); // エラー処理
    // }
    ////////////////
    
    
     ///////////////
     
      // ここにjQueryを使用するコードを記述
      await $.ajax({
        url: url, //アクセスするURL"http://localhost:8000/list"
        type: 'GET', //post or get
        cache: false,        //cacheを使うか使わないかを設定
        dataType:'json',     //data type script・xmlDocument・jsonなど
        //contentType: 'application/json', // コンテンツタイプをJSONに設定
        data: { 
          inputValue : inputValue
        },
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function(response) {
          // console.log("csrfToken is "+csrfToken);
          // console.log("response is "+response);
          // console.log('inputValue is :', inputValue);
          // console.log('Success:', data);

          // console.log('Status:', textStatus);
          // console.log('jqXHR:', jqXHR);
          console.log(response);
        },
        error: function(xhr, status) {
          
          console.log('Status:', status);
          console.log('XHR:', xhr);
        }
      })
      
    
     
      
    ////////////////
    
    
  };

  const validate = (values) => {
    const errors = {};
    //const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.user_name) {
      errors.user_name = "ユーザー名を入力してください";
    }
    
    return errors;
  };


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    
    <div className="App">
      {<h1>Work & Connect</h1>}
      {/* responseIdが存在する場合、idを表示 */}
      {responseId && <p>ID: {responseId}</p>}
      {/* responseSurnameとresponseNameが存在する場合、名前を表示 */}
      {responseSurname && responseName && <p style={Name_textStyle}>{responseSurname}{responseName}</p>}
      {/* responseMailが存在する場合、メアドを表示 */}
      {responseMail && <p style={Mail_textStyle}>{responseMail}</p>}


      <form method="POST" onSubmit={handleSubmit}>
        
        <input type="text" name="user_name" id="1"></input>
        <button type="submit" id="2" className="submitButton">s</button>
      </form>
      <span><LoginModal /></span>

     
    </div>
  );
};

export default App2;

