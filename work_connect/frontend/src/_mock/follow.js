import axios from 'axios';


// senderId と recipientId を使用してフォロー処理を実装する非同期関数
export async function follow(senderId, recipientId) {
  try {
    // フォロー処理のためにPOSTリクエストを送信
    const response = await axios.post('http://localhost:8000/follow', {
      sender_id: senderId,
      recipient_id: recipientId
    });

    // 成功時の処理（必要に応じて）
    console.log('フォロー成功:', response.data);
    const UpdateFollow = response.data.follow_status;
    return UpdateFollow;
    
  } catch (error) {
    // エラーハンドリング
    console.error('フォロー処理中にエラーが発生しました！', error);
  }
}
