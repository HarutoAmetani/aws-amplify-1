<template>
  <h1>ログイン</h1>

  <div>
    <label for="email">メールアドレス</label>
    <input id="email" type="text" v-model="email">
  </div>

  <div>
    <label for="password">パスワード</label>
    <input id="password" type="password" v-model="password">
  </div>

  <div>
    <button @click="login">ログイン</button>
  </div>

  <p v-if="message">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { 
  CognitoIdentityProviderClient, 
  InitiateAuthCommand 
} from "@aws-sdk/client-cognito-identity-provider"

const email = ref('')
const password = ref('')
const message = ref('')

const CLIENT_ID = "44qpua3f2bhop297j64gcjsbv6"
const AWS_REGION = "ap-northeast-1"

const client = new CognitoIdentityProviderClient({
  region: AWS_REGION
})

async function login() {
  message.value = "処理中..."

  try {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email.value,
        PASSWORD: password.value
      }
    })

    const result = await client.send(command)
    message.value = "ログイン成功！"
    console.log(result)
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>