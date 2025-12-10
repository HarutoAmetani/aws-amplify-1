<template>
  <v-container max-width="400">
    <v-card>
      <v-card-item>
        <v-card-title>パスワードリセット（確認コード入力）</v-card-title>

        <v-text-field
          label="メールアドレス"
          type="email"
          v-model="email"
        />

        <v-text-field
          label="確認コード"
          type="text"
          v-model="code"
        />

        <v-text-field
          label="新しいパスワード"
          type="password"
          v-model="newPassword"
        />

        <v-alert
          v-if="message"
          type="error"
          class="mb-4"
        >
          {{ message }}
        </v-alert>

        <v-btn
          block
          color="primary"
          @click="confirmReset"
        >
          パスワードをリセット
        </v-btn>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { useRouter } from 'vuetify/lib/composables/router.mjs'

const email = ref('')
const code = ref('')
const newPassword = ref('')
const message = ref('')

const CLIENT_ID = "44qpua3f2bhop297j64gcjsbv6"
const AWS_REGION = "ap-northeast-1"

const client = new CognitoIdentityProviderClient({
  region: AWS_REGION
})

const router = useRouter()

async function confirmReset() {
  try {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email.value,
      ConfirmationCode: code.value,
      Password: newPassword.value
    })

    await client.send(command)
    router.push('/')
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>