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
>>>>>>> 563d8387d6f83406cb3bfc5ec3fcfbfd3c2b2d2c
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
