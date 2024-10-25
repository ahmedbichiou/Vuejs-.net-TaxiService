<template>
    
      <app-topbar></app-topbar>
  
      <div class="layout-main-container">
        <div class="layout-main">
          <router-view></router-view>
        </div>
        <app-footer></app-footer>
      </div>
    
  </template>
  
  <script setup>
  import AppFooter from './layout/AppFooter.vue';
  import AppTopbar from './layout/AppTopbar.vue';
  </script>
  