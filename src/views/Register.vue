<template>
  <v-container max-width="400">
    <v-card>
      <v-card-item>
        <v-card-title>
          新規登録
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
          @click="register"
        >
          新規登録
        </v-btn>
      </v-card-item>
    </v-card>
  </v-container>
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
    router.push('/vertify')
  } catch (err) {
    console.error(err)
    message.value = "エラー: " + err.message
  }
}
</script>