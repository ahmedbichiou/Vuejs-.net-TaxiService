<script setup>

</script>

<template>
    <div class="layout-topbar">
       
    
        <router-link to="/" class="layout-topbar-title">
    <h1>Taxi Transfers</h1>
  </router-link>

     
    </div>
</template>

<style>
.layout-topbar {
    
    border-radius: 2px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center; /* Vertically align items */
    justify-content: space-between; /* Space between menu button, title, and actions */
}

.layout-topbar-title {
    
    flex: 1; /* Allow the title to take up remaining space */
    text-align: center; /* Center the title text */
    font-size: 1.5rem; /* Adjust font size as needed */
    font-weight: bold; /* Make it bold for emphasis */
    color: #333; /* Change color as needed */
}
</style>
