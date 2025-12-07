<template>
  <h1>トップページ</h1>
  <RouterLink to="/register">新規登録</RouterLink><br/>
  <RouterLink to="/login">ログイン</RouterLink><br/>
  <RouterLink to="/forgot-password">パスワードリセット</RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>