export const useSessionStorage = () => {
  // 情報取得
  const getSessionData = (keyName) => {
    const temp = sessionStorage.getItem(keyName);
    if (temp != null) {
      return JSON.parse(temp);
    }
    return undefined;
  };

  // 編集・追加
  const setSessionData = (keyName, setData) => {
    const temp = JSON.stringify(setData);
    sessionStorage.setItem(keyName, temp);
  };

  // 削除
  const deleteSessionData = (keyName) => {
    sessionStorage.removeItem(keyName);
  };

  return { getSessionData, setSessionData, deleteSessionData };
};
