// リンクを含むテキストをHTMLに変換する関数
export const parseLinks = (text) => {
  // 正規表現：文字探したるやん
  // / (正規表現の型決めますよ)
  // (https?) httpでもhttpsでも探せるでどっちする？
  // :\/\/  スラッシュを文字列にしてるだけです
  // [^\s]+ 空白以外の文字を取得
  // /g URLを見つけて切り取る
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="detailURL">
          {part}
        </a>
      );
    }
    return part;
  });
};
