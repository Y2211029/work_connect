// import React from "react";
// import Modal from "react-modal";

// class SignModal extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       showModal: false,
//     };

//     this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//   }

//   handleOpenModal() {
//     this.setState({ showModal: true });
//   }

//   handleCloseModal() {
//     this.setState({ showModal: false });
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.handleOpenModal}>新規登録</button>
//         <Modal isOpen={this.state.showModal} contentLabel="Example Modal">
//           <h2>新規登録</h2>
//           <form action="">
//             <input type="email" />
//             <input type="submit" value="仮登録"/>
//           </form>

//           <button onClick={this.handleCloseModal}>閉じる</button>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default SignModal;


import React, { useState,useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../../App.css";

// ログインのモーダル CSS設定
const modalStyle = {
  content: {
    position: "none",
    backgroundColor: "rgb(0 0 0 / 70%)",
    border: "none",
    borderRadius: "0",
    padding: "1.5rem",
    overflow: "none"
    }
};

const PreSignModal = () => {

  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    mail: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const url = "http://localhost:8000/s_pre_register";
  const csrf_url = "http://localhost:8000/csrf-token";

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormErrors({}); // エラーメッセージをリセット
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  useEffect(() => {
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    // フォームの送信処理
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const mail = document.getElementsByName('mail')[0].value;

    console.log("mail="+mail);

      //ajax
    $.ajax({
      url: url, // アクセスするURL 
      type: 'GET', // POST または GET
      cache: false, // cacheを使うか使わないかを設定
      dataType: 'json', // データタイプ (script, xmlDocument, jsonなど)
      data: { 
        mail: mail,
      },
      headers: {
        'X-CSRF-TOKEN': csrfToken
      }
    })
    .done(function(data) {
      // ajax成功時の処理

      data = "重複"; /////////////////// ← 仮でデータを入れてます ////////////////////////
      
      if(data != null){
        // すでに入力されたメールアドレスが存在している場合に警告文を表示
        if(data == "重複"){
          console.log(data);
          console.log("メールアドレス重複");
          alert("このメールアドレスはすでに使用されています。");
        } else {
          console.log(data);
          console.log("login成功");
          alert("ログインに成功しました。");
  
          // データの保存(セッションストレージ)
          // sessionStorage.setItem('user_id', data.id);
          // console.log("ユーザーidは"+sessionStorage.getItem('user_id'));
        }


      } else {
        console.log("login失敗");
        alert("ログインに失敗しました。\nユーザー名、メールアドレス、パスポートをご確認ください。");
      }
    })
    .fail(function(textStatus, errorThrown) {
      //ajax失敗時の処理
      console.log('Error:', textStatus, errorThrown);
    });


    // handleCloseModal(); // モーダルを閉じる
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.mail) {
      errors.mail = "メールアドレスを入力してください";
    } else if (!regex.test(values.mail)) {
      errors.mail = "正しいメールアドレスを入力してください";
    }
    return errors;
  };

  return (
    <div>
      <button onClick={handleOpenModal}>新規登録</button>
      <Modal isOpen={showModal} contentLabel="Example Modal" style={modalStyle}>
        <div className="preSignUpFormContainer">
          <form onSubmit={handleSubmit}>
            <h3>Work & Connect 仮登録</h3>
            <hr />
            <div className="preSignUpUiForm">
              <div className="preSignUpFormField">
                <label>メールアドレス</label>
                <input
                  type="text"
                  name="mail"
                  value={formValues.mail}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <button type="submit" className="submitButton">仮登録</button>
              {Object.keys(formErrors).length === 0 && isSubmit && handleCloseModal}
              <button onClick={handleCloseModal}>閉じる</button>
              <a href="">企業の方はこちら</a>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PreSignModal;
