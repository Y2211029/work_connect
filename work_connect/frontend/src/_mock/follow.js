// senderId と recipientId を使用してフォロー処理を実装する非同期関数
export async function follow(senderId, recipientId) {
  try {
    console.log("センダーID",senderId);
    console.log("レシピエントID",recipientId);
    // フォロー処理のためにPOSTリクエストを送信
    const response = await fetch('http://localhost:3000/follow', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ followerId: senderId, followedId: recipientId }),
  });

  const data = await response.json(); // JSON形式のデータを取得
  console.log("レスポンス", data);
  console.log("更新後のフォローステータス", data.follow_status);

  return data.follow_status; // 取得したフォローステータスを返す


  } catch (error) {
    // エラーハンドリング
    console.error('フォロー処理中にエラーが発生しました！', error);
  }
}
