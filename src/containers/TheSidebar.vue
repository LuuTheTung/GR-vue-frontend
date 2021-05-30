<template>
  <div class="hidden">
    <vs-sidebar
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
      <vs-sidebar-item id="company" v-if="this.role == 0">
        <template #icon>
          <i class="fa fa-building-o" aria-hidden="true"></i>
        </template>
        <router-link :to="{ path: '/company' }">Company</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="user" v-if="this.role == 0">
        <template #icon>
          <i class="fa fa-users" aria-hidden="true"></i>
        </template>
        <router-link :to="{ path: '/tables' }">Manage Account</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="category" v-if="this.role == 0">
        <template #icon>
          <i class="fa fa-th-list" aria-hidden="true"></i>
        </template>
        <router-link :to="{ path: '/category' }">Category</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="catalog">
        <template #icon>
          <i class="fa fa-camera-retro"></i>
        </template>
        <router-link :to="{ path: '/catalog' }">Catalog</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="bill">
        <template #icon>
          <i class="fa fa-print"></i>
        </template>
        <router-link :to="{ path: '/bill' }">Invoice</router-link>
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
    role: localStorage.getItem('role'),
  }),
  mounted() {
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
      else if (currentPath == '/tables') this.active = 'user'
      else if (currentPath == '/category') this.active = 'category'
      else if (currentPath == '/catalog') this.active = 'catalog'
      else if (currentPath == '/bill') this.active = 'bill'
      else if (currentPath == '/company') this.active = 'company'
      else if (currentPath == '/pages/login') this.active = 'log'
    }
  },
}
</script>

