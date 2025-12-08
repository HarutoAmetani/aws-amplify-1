<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <v-list-item title="新規登録" link @click="toRegister"></v-list-item>
        <v-list-item title="ログイン" link @click="toLogin"></v-list-item>
        <v-list-item title="パスワードリセット" link @click="toForgotPassword"></v-list-item>
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
import { ref } from 'vue'

const drawer = ref(false)

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
</script>