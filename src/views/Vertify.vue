<template>
  <h1>確認コード入力</h1>

  <div>
    <label for="email">メールアドレス</label>
    <input id="email" type="text" v-model="email">
  </div>

  <div>
    <label for="code">確認コード</label>
    <input id="code" type="text" v-model="code">
  </div>

  <div>
    <button @click="confirm">確認</button>
    <button @click="resendCode">コードを再送</button>
  </div>

  <p v-if="message">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { CognitoIdentityProviderClient, ConfirmSignUpCommand, ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider"

const email = ref('')
const code = ref('')
const message = ref('')

const CLIENT_ID = "44qpua3f2bhop297j64gcjsbv6"
const AWS_REGION = "ap-northeast-1"

const client = new CognitoIdentityProviderClient({
  region: AWS_REGION
})

async function confirm() {
  message.value = "処理中..."

  try {
    const command = new ConfirmSignUpCommand({
      ClientId: CLIENT_ID,
      Username: email.value,
      ConfirmationCode: code.value
    })

    await client.send(command)
    message.value = "確認が完了しました！ログイン可能です。"
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}

async function resendCode() {
  message.value = "処理中..."

  try {
    const command = new ResendConfirmationCodeCommand({
      ClientId: CLIENT_ID,
      Username: email.value
    })

    await client.send(command)
    message.value = "確認コードを再送しました！メールをチェックしてください。"
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>