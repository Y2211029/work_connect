import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const CompanyAddress = ({ CompanyAddressData }) => {

  const [CompanyAddress, setCompanyAddress] = useState(CompanyAddressData);
  const { getSessionData, updateSessionData } = useSessionStorage();

  useEffect(() => {
    const SessionData = getSessionData("accountData");

    if ((SessionData.CompanyAddress !== undefined)||
    SessionData.CompanyAddressEditing) {
      setCompanyAddress(SessionData.CompanyAddress);
    } else {
      setCompanyAddress(CompanyAddressData);
    }
  }, [CompanyAddressData]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (e.target.name === "CompanyAddress") {
      console.log("あってます");
      setCompanyAddress(newValue);
      updateSessionData("accountData", "CompanyAddressEditing", true);
    }
  };

  useEffect(() => {
    updateSessionData("accountData", "CompanyAddress", CompanyAddress);
  }, [CompanyAddress]);

  return (
    <div style={{ display: "flex" }}>
        <TextField
            fullWidth
            label="本社所在地"
            margin="normal"
            name="CompanyAddress"
            onChange={handleChange}
            required
            type="text"
            value={CompanyAddress}
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

CompanyAddress.propTypes = {
  CompanyAddressData: PropTypes.string.isRequired,
};

export default CompanyAddress;
