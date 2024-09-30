import Button from "@mui/material/Button";

export const UseCreateTagbutton = () => {
  const tagCreate = (TagString) => {
    // タグ作成
    if (TagString) {
      console.log("TagString", TagString);
      let TagButton = [];

      TagButton = TagString.split(",").map((item) => (
        <Button
          key={item}
          variant="contained"
          // color="primary"
          sx={{
            padding: "4px 2px 4px 2px",
            margin: "2px",
            borderRadius: "10px",
            fontSize: "11px",
            background: "linear-gradient(#41A4FF, #9198e5)",
            "&:hover": {
              background: "linear-gradient(#c2c2c2, #e5ad91)",
            },
          }}
        >
          {item}
        </Button>
      ));

      return TagButton;
    }
  };

  return {
    tagCreate,
  };
};
