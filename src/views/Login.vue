<template>
  <v-container max-width="400">
    <v-card>
      <v-card-item>
        <v-card-title>
          ログイン
        </v-card-title>

        <v-text-field
          label="メールアドレス"
          type="email"
          v-model="email"
        />

        <v-text-field
          label="パスワード"
          type="password"
          v-model="password"
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
          @click="login"
        >
          ログイン
        </v-btn>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { 
  CognitoIdentityProviderClient, 
  InitiateAuthCommand 
} from "@aws-sdk/client-cognito-identity-provider"
import { useRouter } from 'vuetify/lib/composables/router.mjs'

const email = ref('')
const password = ref('')
const message = ref('')

const CLIENT_ID = "44qpua3f2bhop297j64gcjsbv6"
const AWS_REGION = "ap-northeast-1"

const client = new CognitoIdentityProviderClient({
  region: AWS_REGION
})

const router = useRouter()

async function login() {
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
    localStorage.setItem("idToken", result.AuthenticationResult.IdToken)
    router.push('/')
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>