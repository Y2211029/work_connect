import { useContext, useEffect } from "react";
import { emailContext } from "src/components/account/students/EmailContext";

const Email = () => {
  const AccountData = useContext(emailContext);
  const objAccountData = {};
  let emailView = "";
  useEffect(() => {
    //
    for (const [key, value] of AccountData) {
      objAccountData[key] = value;
    }
    console.log("AccountData.email", objAccountData.email);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    emailView = objAccountData.email;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // accountDataの変更を監視

  

  return emailView;
};

export default Email;
