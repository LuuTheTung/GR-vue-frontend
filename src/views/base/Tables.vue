<template lang="html">
  <section class="home">
    <div>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader>
              <div class="row justify-content-between">
                <div class="col-4">
                  <h4>Account Management</h4>
                </div>
                <div>
                  <vs-button v-on:click="onCreateUser()">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i> Create Account
                  </vs-button>
                </div>
              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <vs-dialog prevent-close width="700px" v-model="active">
                  <template #header>
                    <h4 class="not-margin" v-if="!user_id">
                      Create <b>User</b>
                    </h4>
                    <h4 class="not-margin" v-if="user_id">
                      Edit <b>User</b>
                    </h4>
                  </template>
                  <div class="con-form">
                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="4" class="label-margin"> Given Name:
                        <vs-input border v-model="given_name" placeholder="Enter given name" />
                      </vs-col>
                      <vs-col vs-type="flex" w="2" class="label-margin">
                      </vs-col>
                      <vs-col vs-type="flex" w="4" class="label-margin"> Family Name:
                        <vs-input border v-model="family_name" placeholder="Enter family name" />
                      </vs-col>
                    </vs-row>

                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="4" class="label-margin" :class="{ 'error': $v.email.$error }"> Email:
                        <vs-input border v-model="$v.email.$model" placeholder="Enter email" />
                        <div  v-if="!$v.email.email">Email invalid</div>
                      </vs-col>
                      <vs-col vs-type="flex" w="2" class="label-margin">
                      </vs-col>
                      <vs-col vs-type="flex" w="4" class="label-margin"> Password:
                        <vs-input border type="password"  v-model="password" placeholder="Enter password" ></vs-input>
                      </vs-col>
                    </vs-row>

                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="4" class="label-margin" :class="{ 'error': $v.phone_number.$error }"> Phone number:
                        <vs-input border v-model="$v.phone_number.$model" placeholder="Enter phone number" />
                        <div v-if="!$v.phone_number.numeric">Phone number invalid</div>
                      </vs-col>
                      <vs-col vs-type="flex" w="2" class="label-margin">  </vs-col>
                      <vs-col vs-type="flex" w="4" class="label-margin"> Address:
                        <vs-input border v-model="address" placeholder="Enter address" />
                      </vs-col>
                    </vs-row>

                    <vs-row class="form-margin">
                      <vs-col class="label-margin"> State:</vs-col>
                      <vs-radio v-model="state_flg" val="0">
                        Working
                      </vs-radio>
                      <vs-radio disabled v-model="state_flg" val="1" v-if="!user_id">
                        Rejected
                      </vs-radio>
                      <vs-radio v-model="state_flg" val="1" v-if="user_id">
                        Rejected
                      </vs-radio>

                    </vs-row>

                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="6" class="label-margin"> Work from:</vs-col>
                      <vs-col vs-type="flex" w="8">
                        <VueCtkDateTimePicker id="start_work_date" v-model="start_work_date" :outputFormat="'YYYY-MM-DD HH:mm:ss'" :formatted="'MM/DD/YYYY HH:mm'" :format="'MM/DD/YYYY HH:mm'" required></VueCtkDateTimePicker>
                      </vs-col>
                    </vs-row>

                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="6" class="label-margin"> Reject from:</vs-col>
                      <vs-col vs-type="flex" w="8">
                        <VueCtkDateTimePicker disabled v-model="end_work_date" v-if="!user_id"></VueCtkDateTimePicker>
                        <VueCtkDateTimePicker v-model="end_work_date" v-if="user_id" :outputFormat="'YYYY-MM-DD HH:mm:ss'" :formatted="'MM/DD/YYYY HH:mm'" :format="'MM/DD/YYYY HH:mm'"></VueCtkDateTimePicker>
                      </vs-col>
                    </vs-row>
                  </div>

                  <template #footer>
                    <div class="footer-dialog">
                      <vs-button v-on:click="onSave(user_id)" block v-if="!user_id">
                        Create
                      </vs-button>
                      <vs-button v-on:click="onSave(user_id)" block v-if="user_id">
                        Update
                      </vs-button>
                    </div>
                  </template>
                </vs-dialog>
                <vs-table >
                  <template #header>
                    <vs-input v-model="search" border placeholder="Search"/>
                  </template>
                  <template #thead>
                    <vs-tr>
                      <vs-th sort @click="listSave = $vs.sortData($event ,listSave, 'given_name')">Full Name</vs-th>
                      <vs-th sort @click="listSave = $vs.sortData($event ,listSave, 'email')">Email</vs-th>
                      <vs-th >Phone Number</vs-th>
                      <vs-th >Address</vs-th>
                      <vs-th sort @click="listSave = $vs.sortData($event ,listSave, 'start_work_date')">Work From</vs-th>
                      <vs-th >Reject From</vs-th>
                      <vs-th class="center">Edit Account</vs-th>
                    </vs-tr>
                  </template>
                  <template #tbody>
                    <vs-tr :key="i" v-for="(tr, i) in $vs.getPage($vs.getSearch(listSave, search), page, max)"  :data="tr">
                      <vs-td>{{ tr.given_name }} {{tr.family_name}}</vs-td>
                      <vs-td>{{ tr.email }}</vs-td>
                      <vs-td>{{ tr.phone_number }}</vs-td>
                      <vs-td>{{ tr.address }}</vs-td>
                      <vs-td>{{ tr.start_work_date }}</vs-td>
                      <vs-td>{{ tr.end_work_date }}</vs-td>
                      <vs-td  @click="onEdit(tr)">
                        <vs-button >
                          <i class="fa fa-pencil" aria-hidden="true"></i> Edit
                        </vs-button></vs-td>
                    </vs-tr>
                  </template>
                  <template #footer>
                    <vs-pagination v-model="page" :length="$vs.getLength(listSave, max)" />
                  </template>
                </vs-table>
              </CCardBody>
            </CCollapse>
          </CCard>
        </CCol>
      </CRow>
    </div>
  </section>
</template>

<script lang="js">
import Axios from 'axios'
import '@babel/polyfill'
import { required, minLength, email, numeric } from 'vuelidate/lib/validators'
export default  {
  name: 'Tables',
  props: [],
  data() {
    return {
      formCollapsed: true,
      page: 1,
      max: 10,
      listSave: [],
      data:[],
      search: '',
      // userDetail: [],
      active: false,
      //create
      mst_company_id: localStorage.getItem('mst_company_id'),
      family_name: '',
      given_name:'',
      email: '',
      password: '',
      phone_number: '',
      address: '',
      state_flg: 0,
      start_work_date: '',
      end_work_date: '',
      user_flg: 1,
      userIdDialog: '',
      user_id: '',
      create_user: localStorage.getItem('User'),
    }
  },
  methods: {
    async getListCus(create_user) {
      console.log(create_user);
      this.listSave = await Axios.get(`http://localhost:8000/api/userByAdmin/${create_user}`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
      console.log(this.listSave);
    },
    onCreateUser(){
      this.active = true;
      this.mst_company_id = localStorage.getItem('mst_company_id');
      this.family_name = '';
      this.given_name = '';
      this.email = '';
      this.password = '';
      this.phone_number = '';
      this.family_name = '';
      this.address = '';
      this.state_flg = 0;
      this.start_work_date = '';
      this.end_work_date = '';
      this.user_flg = 1;
    },
    async onEdit(tr) {
      this.active = true;
      if (tr.id){
        this.user_id = tr.id ;
        let userDetail = await Axios.get(`http://localhost:8000/api/customers/${tr.id}`)
            .then(response => {
              return Promise.resolve(response.data);
            })
            .catch(error => {
              error = error.response;
              const message = (error && error.data && error.data.message) || error.statusText;
              return Promise.reject(message);
            });
        this.mst_company_id = userDetail['mst_company_id'];
        this.family_name = userDetail['family_name'];
        this.given_name = userDetail['given_name'];
        this.email = userDetail['email'];
        this.password = userDetail['password'];
        this.phone_number = userDetail['phone_number'];
        this.family_name = userDetail['family_name'];
        this.address = userDetail['address'];
        this.state_flg = userDetail['state_flg'];
        this.start_work_date = userDetail['start_work_date'];
        this.end_work_date = userDetail['end_work_date'];
        this.user_flg = userDetail['user_flg'];
      }
    },
    async onSave(id){

      let data = {
        mst_company_id: this.mst_company_id,
        family_name : this.family_name,
        given_name : this.given_name,
        email : this.email,
        password : this.password,
        phone_number: this.phone_number,
        address: this.address,
        state_flg: this.state_flg,
        start_work_date: this.start_work_date,
        end_work_date: this.end_work_date,
        user_flg: this.user_flg,
        create_user: localStorage.getItem('User')
      }
      if (id){
        data.id = id;
        this.updateStatus = await Axios.put(`http://localhost:8000/api/customers/${data.id}`, data)
            .then(response => {
              return Promise.resolve(response.status);
            })
            .catch(error => {
              error = error.response;
              const message = (error && error.data && error.data.message) || error.statusText;
              return Promise.reject(message);
            });
        if (this.updateStatus == 200){
            this.$vs.notification({
              title:'Update User Success',
              progress: 'auto',
              color:'success',
              square: true,
            });

        }
        else {
          this.$vs.notification({
            title:'Update User False',
            square: true,
            color:'danger',
            progress: 'auto',
          })
        }
      }
      else {
        this.createStatus = await Axios.post(`http://localhost:8000/api/customers`, data)
            .then(response => {
              return Promise.resolve(response.status);
            })
            .catch(error => {
              error = error.response;
              const message = (error && error.data && error.data.message) || error.statusText;
              return Promise.reject(message);
            });
        if (this.createStatus == 200){
            this.$vs.notification({
              title:'Create User Success',
              progress: 'auto',
              color:'success',
              square: true,
            });
        }
        else {
          this.$vs.notification({
            title:'Create User False',
            square: true,
            color:'danger',
            progress: 'auto',
          })
        }
      }
      this.active = false;
      await this.getListCus(this.create_user);
    },

  },
  computed: {

  },
  mounted() {
    this.getListCus(this.create_user);
  },
  validations: {
    email: {
      email,
      required
    },
    phone_number: {
      numeric
    }
  }
}
</script>

<style scoped>
  .form-margin{
    margin: 0px 0px 10px 20px;
  }
  .label-margin{
    margin-bottom: 10px;
  }
  .home{
    margin-left: 60px;
  }
  .error{
    color: red;
    animation-name: shakeError;
    animation-fill-mode: forwards;
    animation-duration: .6s;
    animation-timing-function: ease-in-out;
  }
  h4{
    padding-top: 8px;
  }
</style>
