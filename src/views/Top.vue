<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list nav v-if="!isLogin">
        <v-list-item title="新規登録" link @click="toRegister"></v-list-item>
        <v-list-item title="ログイン" link @click="toLogin"></v-list-item>
        <v-list-item title="パスワードリセット" link @click="toForgotPassword"></v-list-item>
      </v-list>
      <v-list nav v-else>
        <v-list-item title="ログアウト" link @click="logout"></v-list-item>
        <v-list-item title="退会" link @click="withdrawal"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>トップ</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'
import { 
  CognitoIdentityProviderClient, 
  DeleteUserCommand 
} from "@aws-sdk/client-cognito-identity-provider"

const drawer = ref(false)

const isLogin =ref(false)

async function checkLogin() {
  const token = localStorage.getItem("idToken")

  if (!token) {
    isLogin.value = false
    return
  }

  try {
    const res = await fetch(
      "https://t2z35n9mc7.execute-api.ap-northeast-1.amazonaws.com/dev/auth/check",
      {
        method: "GET",
        headers: {
          "Authorization": token,
        },
      }
    )

    isLogin.value = true
  } catch (err) {
    console.log(err)
    isLogin.value = false
  }
}

onMounted(() => {
  checkLogin()
}) 

const router = useRouter()

function toRegister() {
  router.push('/register')
}

function toLogin() {
  router.push('/login')
}

function toForgotPassword() {
  router.push('/forgot-password')
}

function logout() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("idToken")
  location.reload()
}

const CLIENT_ID = "44qpua3f2bhop297j64gcjsbv6"
const AWS_REGION = "ap-northeast-1"

const client = new CognitoIdentityProviderClient({
  region: AWS_REGION
})

async function withdrawal() {
  const AccessToken = localStorage.getItem("accessToken")
  try {
    const command = new DeleteUserCommand({
      AccessToken: AccessToken
    })

    await client.send(command)

    localStorage.removeItem("accessToken")
    localStorage.removeItem("idToken")

    location.reload()
  } catch (err) {
    console.log(err)
  }
}
</script>