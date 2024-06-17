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
      
      const updateSessionData = (sessionKeyName, jsonKeyName, setData) => {
        let sessionData = getSessionData(sessionKeyName);
        sessionData[jsonKeyName] = setData;
        setSessionData(sessionKeyName, sessionData)
  };

  return { getSessionData, setSessionData, deleteSessionData, updateSessionData };
};
