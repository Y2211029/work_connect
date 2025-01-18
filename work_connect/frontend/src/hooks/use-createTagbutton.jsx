// import Button from "@mui/material/Button";

export const UseCreateTagbutton = () => {
  const tagCreate = (TagString) => {
    // タグ作成
    if (TagString) {
      console.log("TagString", TagString);
      console.log("useCreateTag location : ", location.pathname.split("/")[1]);
      let TagButton = [];
      let CreateTagLocation = location.pathname.split("/")[1];

      if (CreateTagLocation === "WorkDetail" || CreateTagLocation === "VideoDetail") {
        console.log("useCreateTag:if", TagString);
        // 枠線あり
        TagButton = TagString.split(",").map((item) => (
          <>
            <button className="tagButton">{item}</button>
          </>
        ));
      } else if (CreateTagLocation === "CompanyList" || CreateTagLocation === "StudentList") {
        // item 配列の要素が順番に入ってる ["a"]
        // index 配列の番号 [0]
        // array 配列そのものが入ってる ["a","b","c"]
        console.log("useCreateTag:elseIf", TagString);
        // 枠線なし
        TagButton = TagString.split(",").map((item, index, array) => (
          <>
            <div
              style={{
                fontSize: "14px",
              }}
            >
              {item}
            </div>
            {index < array.length - 1 && <div>、</div>}
          </>
        ));
      } else {
        console.log("useCreateTag:else", TagString);
        // 枠線付き
        TagButton = TagString.split(",").map((item) => (
          <>
            <button className="tagButton">{item}</button>
          </>
        ));
      }

      return TagButton;
    }
  };

  return {
    tagCreate,
  };
};
