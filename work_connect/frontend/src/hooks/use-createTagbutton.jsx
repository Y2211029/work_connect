import Button from "@mui/material/Button";

export const useCreateTagbutton = () => {
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
            padding: "2px",
            margin: "2px",
            // background: "#41A4FF",
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
