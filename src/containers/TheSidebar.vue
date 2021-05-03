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
        <router-link :to="{ path: '/dashboard' }">Dashboard</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="user">
        <template #icon>
          <i class="fa fa-users" aria-hidden="true"></i>
        </template>
        <router-link :to="{ path: '/base/tables' }">Manage User/Admin</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="category">
        <template #icon>
          <i class="fa fa-th-list" aria-hidden="true"></i>
        </template>
        <router-link :to="{ path: '/base/category' }">Category</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="catalog">
        <template #icon>
          <i class="fa fa-camera-retro"></i>
        </template>
        <router-link :to="{ path: '/base/catalog' }">Catalog</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="bill">
        <template #icon>
          <i class="fa fa-print"></i>
        </template>
        <router-link :to="{ path: '/base/bill' }">Invoice</router-link>
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
    this.getURL();
  },
  methods: {
    async logOut(){
      localStorage.removeItem('User');
      await this.$router.push('/pages/login');
    },
    getURL(){
      var currentPath = this.$route.path;
      console.log(currentPath);
      if (currentPath == '/dashboard') this.active = 'dashboard'
      else if (currentPath == '/base/tables') this.active = 'user'
      else if (currentPath == '/base/category') this.active = 'category'
      else if (currentPath == '/base/catalog') this.active = 'catalog'
      else if (currentPath == '/base/bill') this.active = 'bill'
    }
  },
}
</script>

