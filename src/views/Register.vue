<template>
  <h1>新規登録</h1>
  <div>
    <label for="email">メールアドレス</label>
    <input
      id="email"
      type="text"
      v-model="email"
    >
  </div>
  <div>
    <label for="password">パスワード</label>
    <input
      id="password"
      type="password"
      v-model="password"
    >
  </div>
  <div>
    <button @click="register">
      新規登録
    </button>
  </div>

  <p v-if="message">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"
import { useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const message = ref('')

const CLIENT_ID = "44qpua3f2bhop297j64gcjsbv6"
const AWS_REGION = "ap-northeast-1"

const client = new CognitoIdentityProviderClient({
  region: AWS_REGION
})

const router = useRouter();

async function register() {
  message.value = "処理中..."

  try {
    const command = new SignUpCommand({
      ClientId: CLIENT_ID,
      Username: email.value,
      Password: password.value,
      UserAttributes: [
        { Name: "email", Value: email.value }
      ]
    })

    const result = await client.send(command)
    message.value = "登録成功！メールを確認してください。"
    router.push('/vertify')
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>