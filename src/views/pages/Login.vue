<template>
  <div >
      <vs-row vs-align="center"
              vs-type="flex" vs-justify="space-around" vs-w="12">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
          <img src="/img/141982189_1792566427586301_5542900549814552096_o.jpg" class="zoom">
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <CCard class="p-4 right-content">
              <CCardBody>
                <CForm>
                  <h1>DIBO CAKE</h1>
                  <p></p>
                  <vs-row class="form-margin">
                    <vs-col vs-type="flex" w="6" class="label-margin">
                      <vs-input color="#7d33ff" border v-model="username" placeholder="Username">
                        <template #icon>
                          <i class="fa fa-user" aria-hidden="true"></i>
                        </template>
                      </vs-input>
                    </vs-col>
                  </vs-row>
                  <vs-row class="form-margin">
                    <vs-col vs-type="flex" w="6" class="label-margin">
                      <vs-input color="#7d33ff" border type="password" v-model="password" placeholder="Password">
                        <template #icon>
                          <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                        </template>
                      </vs-input>
                    </vs-col>
                  </vs-row>
                  <CRow>
                    <CCol style="padding-top: 10px">
                      <vs-button v-on:click="login()" color="primary" type="filled"> Login</vs-button>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>

        </vs-col>
      </vs-row>
  </div>
</template>

<script lang="js">
import Axios from 'axios'
import '@babel/polyfill'
export default  {
  name: 'Login',
  props: [],
  mounted() {

  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login(){
      let params = {
        username              : this.username,
        password              : this.password,
      };

      this.listSave = await  Axios.post(`http://localhost:8000/api/login/`, params)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
      if(this.listSave){
        localStorage.setItem('User', this.listSave.email);
        localStorage.setItem('role', this.listSave.user_flg);
        localStorage.setItem('mst_company_id', this.listSave.mst_company_id);
        await this.$router.push('/dashboard');
        this.$vs.notification({
          title:'Login success',
          progress: 'auto',
          color:'success',

        });
      }
      else {
        this.$vs.notification({
          title:'Login false',
          text:'Username or password invalid!',

          color:'danger',
          progress: 'auto',
        })
      }

    },

  },
  computed: {

  }
}
</script>
<style scoped>
.zoom{
  width: 100%;
  height: 964px;
}
.right-content{
  margin-top: 305px;
}
</style>
