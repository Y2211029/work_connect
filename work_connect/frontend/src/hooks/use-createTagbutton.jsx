export const useCreateTagbutton = () => {
  const tagCreate = (TagString) => {
    // タグ作成
    if (TagString) {
      console.log("TagString", TagString);
      let TagButton = [];

      TagButton = TagString.split(",").map((item) => <button key={item}>{item}</button>);
      return TagButton;
    }
  };

  return {
    tagCreate,
  };
};
