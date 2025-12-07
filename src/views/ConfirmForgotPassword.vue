<template>
  <h1>パスワードリセット（確認コード入力）</h1>

  <div>
    <label for="email">メールアドレス</label>
    <input id="email" type="text" v-model="email">
  </div>

  <div>
    <label for="code">確認コード</label>
    <input id="code" type="text" v-model="code">
  </div>

  <div>
    <label for="newPassword">新しいパスワード</label>
    <input id="newPassword" type="password" v-model="newPassword">
  </div>

  <div>
    <button @click="confirmReset">パスワードをリセット</button>
  </div>

  <p v-if="message">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"

const email = ref('')
const code = ref('')
const newPassword = ref('')
const message = ref('')

const CLIENT_ID = "44qpua3f2bhop297j64gcjsbv6"
const AWS_REGION = "ap-northeast-1"

const client = new CognitoIdentityProviderClient({
  region: AWS_REGION
})

async function confirmReset() {
  message.value = "処理中..."

  try {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email.value,
      ConfirmationCode: code.value,
      Password: newPassword.value
    })

    await client.send(command)
    message.value = "パスワードが再設定されました！ログインしてください。"

  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>