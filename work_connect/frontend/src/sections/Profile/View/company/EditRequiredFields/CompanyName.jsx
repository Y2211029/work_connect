import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const CompanyName = ({ CompanyNameData }) => {

  const [CompanyName, setCompanyName] = useState(CompanyNameData);
  const { getSessionData, updateSessionData } = useSessionStorage();

  useEffect(() => {
    const SessionData = getSessionData("accountData");

    if ((SessionData.CompanyName !== undefined)
    || SessionData.CompanyNameEditing ) {
      setCompanyName(SessionData.CompanyName);
    } else {
      setCompanyName(CompanyNameData);
    }
  }, [CompanyNameData]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setCompanyName(newValue);
    updateSessionData("accountData", "CompanyNameEditing", true);
  };

  useEffect(() => {
    updateSessionData("accountData", "CompanyName", CompanyName);
  }, [CompanyName]);

  return (
    <div style={{ display: "flex" }}>
        <TextField
            fullWidth
            label="企業名"
            margin="normal"
            name="CompanyName"
            onChange={handleChange}
<<<<<<< HEAD
            required
=======
            // required
>>>>>>> 3c5789677e38c908589a20c4b753cb2d7d8e5230
            type="text"
            value={CompanyName}
            variant="outlined"
            sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                marginTop: '6px',
                marginBottom: '0'
            }}
        />

    </div>
  );
};

CompanyName.propTypes = {
  CompanyNameData: PropTypes.string.isRequired,
};

export default CompanyName;
