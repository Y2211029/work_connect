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
          // color="primary"
          sx={{
            // padding: "4px 2px 4px 2px",
            margin: "0px",
            borderRadius: "10px",
            fontSize: "11px",
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
