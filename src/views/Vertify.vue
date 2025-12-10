<template>
  <v-container max-width="400">
    <v-card>
      <v-card-item>
        <v-card-title>
          確認コード入力
        </v-card-title>

        <v-text-field
          label="メールアドレス"
          type="email"
          v-model="email"
        />

        <v-text-field
          label="確認コード"
          v-model="code"
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
          class="mb-3"
          @click="confirm"
        >
          確認
        </v-btn>

        <v-btn
          block
          color="secondary"
          @click="resendCode"
        >
          コードを再送
        </v-btn>

      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { CognitoIdentityProviderClient, ConfirmSignUpCommand, ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider"
import { useRouter } from 'vuetify/lib/composables/router.mjs';

const email = ref('')
const code = ref('')
const message = ref('')

const CLIENT_ID = "44qpua3f2bhop297j64gcjsbv6"
const AWS_REGION = "ap-northeast-1"

const client = new CognitoIdentityProviderClient({
  region: AWS_REGION
})

const router = useRouter()

async function confirm() {
  try {
    const command = new ConfirmSignUpCommand({
      ClientId: CLIENT_ID,
      Username: email.value,
      ConfirmationCode: code.value
    })

    await client.send(command)
    router.push('/')
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}

async function resendCode() {
  try {
    const command = new ResendConfirmationCodeCommand({
      ClientId: CLIENT_ID,
      Username: email.value
    })

    await client.send(command)
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>