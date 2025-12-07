<template>
  <h1>パスワードリセット</h1>

  <div>
    <label for="email">メールアドレス</label>
    <input id="email" type="text" v-model="email" />
  </div>

  <div>
    <button @click="sendResetCode">リセットメール送信</button>
  </div>

  <p v-if="message">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { CognitoIdentityProviderClient, ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { useRouter } from 'vue-router';

const email = ref('')
const message = ref('')

const CLIENT_ID = "44qpua3f2bhop297j64gcjsbv6"
const AWS_REGION = "ap-northeast-1"

const client = new CognitoIdentityProviderClient({
  region: AWS_REGION
})

const router = useRouter()

async function sendResetCode() {
  message.value = "送信中..."

  try {
    const command = new ForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email.value
    })

    const result = await client.send(command)
    message.value = "パスワードリセットコードを送信しました。メールをご確認ください。"
    router.push('/confirm-forgot-password')

  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>