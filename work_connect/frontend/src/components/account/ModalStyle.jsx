import { useState, useEffect } from "react";

const useModalStyle = () => {
  const [modalStyle, setModalStyle] = useState(getStyle(window.innerWidth));

  // ウィンドウサイズの変更を監視
  useEffect(() => {
    const handleResize = () => {
      setModalStyle(getStyle(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return modalStyle;
};

// スタイル生成関数
const getStyle = (width) => {
  const baseOverlay = {
    zIndex: 1300,
    overflowY: "scroll",
    background: "rgb(0 0 0 / 70%)",
  };

  const baseContent = {
    background: "none",
    border: "none",
    borderRadius: "0px",
    height: "fit-content",
    overflow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  if (width <= 600) {
    console.log("ModalStyle: 600px以下適用");
    return {
      overlay: baseOverlay,
      content: {
        ...baseContent,
        width: "90%",
        padding: 0,
      },
    };
  } else if (width <= 900) {
    console.log("ModalStyle: 900px以下適用");
    return {
      overlay: baseOverlay,
      content: {
        ...baseContent,
        width: "80%",
      },
    };
  } else {
    console.log("ModalStyle: 900px以上適用");
    return {
      overlay: baseOverlay,
      content: {
        ...baseContent,
        width: "fit-content",
      },
    };
  }
};

export default useModalStyle;
