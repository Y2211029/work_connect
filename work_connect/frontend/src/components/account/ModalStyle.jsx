const ModalStyle = {
  overlay: {
    zIndex: 1300,
    overflowY: "scroll",
    background: "rgb(0 0 0 / 70%)",
  },
  content: {
    // position: "none",
    background: "none",
    border: "none",
    borderRadius: "0px",
    width: "fit-content",
    height: "fit-content",
    overflow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default ModalStyle;
