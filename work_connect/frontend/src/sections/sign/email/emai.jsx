import { useContext } from "react";
import { emailContext } from "src/components/account/students/EmailContext";

const Email = () => {
  const AccountData = useContext(emailContext);
  // const objAccountData = {};

  // //
  // for (const [key, value] of AccountData) {
  //   objAccountData[key] = value;
  // }

  console.log("AccountData.email", AccountData.email);
  console.log("AccountData.email", AccountData.email);
  console.log("AccountData.email", AccountData.email);

  return <h1>{AccountData.email}</h1>;
};

export default Email;
