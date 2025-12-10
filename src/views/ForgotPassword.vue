<template>
  <v-container max-width="400">
    <v-card>
      <v-card-item>
        <v-card-title>
          パスワードリセット
        </v-card-title>

        <v-text-field
          label="メールアドレス"
          type="email"
          v-model="email"
        />

        <v-alert
          v-if="message"
          type="error"
          class="mb-5"
        >
          {{ message }}
        </v-alert>

        <v-btn
          block
          color="primary"
          @click="sendResetCode"
        >
          リセットメール送信
        </v-btn>
      </v-card-item>
    </v-card>
  </v-container>
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
  try {
    const command = new ForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email.value
    })

    const result = await client.send(command)
    router.push('/confirm-forgot-password')
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>