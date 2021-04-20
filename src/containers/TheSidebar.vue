<template>
  <div class="hidden">
    <vs-sidebar
        absolute
        hover-expand
        reduce
        v-model="active"
        open
    >
      <template #logo>
        <img src="/img/logo.jpg" alt="">
      </template>
      <vs-sidebar-item  id="dashboard">
        <template #icon>
          <i class="fa fa-bar-chart" aria-hidden="true"></i>
        </template>
        <div v-on:click="goToDashboard()"> Dashboard</div>
      </vs-sidebar-item>
      <vs-sidebar-item id="user">
        <template #icon>
          <i class="fa fa-users" aria-hidden="true"></i>
        </template>
        <div v-on:click="goToUserAdmin()"> Manage User/Admin</div>
      </vs-sidebar-item>
      <vs-sidebar-item id="category">
        <template #icon>
          <i class="fa fa-th-list" aria-hidden="true"></i>
        </template>
        <div v-on:click="goToCategory()"> Category</div>
      </vs-sidebar-item>
      <vs-sidebar-item id="catalog">
        <template #icon>
          <i class="fa fa-camera-retro"></i>
        </template>
        <div v-on:click="goToCatalog()"> Catalog</div>
      </vs-sidebar-item>

      <template #footer>
        <vs-sidebar-item id="log" >
          <template #icon>
            <i class="fa fa-sign-out" aria-hidden="true"></i>
          </template>
          <div v-on:click="logOut()"> Log out</div>
        </vs-sidebar-item>
      </template>
    </vs-sidebar>
  </div>
</template>
<script>

export default {
  name: 'TheSidebar',
  data:() => ({
    active: 'dashboard',
  })
  ,mounted() {

  },
  methods: {
    async goToDashboard(){
      await this.$router.push('/dashboard');
    },
    async goToUserAdmin(){
      await this.$router.push('/base/tables');
    },
    async goToCategory(){
      await this.$router.push('/base/category');
    },
    async goToCatalog(){
      await this.$router.push('/base/catalog');
    },
    async logOut(){
      localStorage.removeItem('User');
      await this.$router.push('/pages/login');
    }
  },
}
</script>

