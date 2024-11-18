import Typography from '@mui/material/Typography'; 
import PropTypes from 'prop-types';


function TypographyItems({ ItemName, ItemDetail }) {
    return (
        <Typography variant="body2" className="TypographyWidth" sx={{ fontWeight: "bold", color: "#3F4551" }}>
            {ItemName}: <span style={{ fontWeight: "normal", color: "#3F4551" }}>{ItemDetail}</span>
        </Typography>
    );
}
export { TypographyItems };


TypographyItems.propTypes = {
    ItemName: PropTypes.string,
    ItemDetail: PropTypes.string,
  };
  