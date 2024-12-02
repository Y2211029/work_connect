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
        console.log("useCreateTag:if", TagString)
        // 枠線あり
        TagButton = TagString.split(",").map((item) => (
          <>
            <span
              style={{
                fontSize: "16px",
                border: "1px solid #b8b8b8",
                borderRadius: "5px",
                padding: "5px",
                margin: "2px",
              }}
            >
              {item}
            </span>
          </>
        ));
      } else if (CreateTagLocation === "CompanyList" || CreateTagLocation === "StudentList") {
        // item 配列の要素が順番に入ってる ["a"]
        // index 配列の番号 [0]
        // array 配列そのものが入ってる ["a","b","c"]
        console.log("useCreateTag:elseIf", TagString)
        // 枠線なし
        TagButton = TagString.split(",").map((item, index, array) => (
          <>
            <span
              style={{
                fontSize: "14px",
              }}
            >
              {item}
            </span>
            {index < array.length - 1 && <span>、</span>}
          </>
        ));
      } else {
        console.log("useCreateTag:else", TagString)
        // 枠線付き
        TagButton = TagString.split(",").map((item) => (
          <>
            <span
              style={{
                fontSize: "11px",
                border: "1px solid #b8b8b8",
                borderRadius: "5px",
                padding: "5px",
                margin: "2px",
              }}
            >
              {item}
            </span>
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
