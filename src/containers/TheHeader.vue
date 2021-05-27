<template>
  <CHeader fixed with-subheader light>
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">

      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
export default  {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  props: [],
  mounted() {

  },
  data() {
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
