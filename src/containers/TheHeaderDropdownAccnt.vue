<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="text-size">
          {{create_user}}
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>

    <CDropdownItem v-on:click="login()">
      <CIcon  name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return {
      create_user: localStorage.getItem('User'),
    }
  },
  methods: {
    async login(){
      localStorage.removeItem('User');
      await this.$router.push('/pages/login');

    }
  },
}
</script>

<style scoped>
  .text-size {
    font-weight: bold;
    font-size: 1rem;
  }

</style>
