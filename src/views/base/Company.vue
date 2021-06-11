<template lang="html">
  <section class="home">
    <div>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader>
              <div class="row justify-content-between">
                <div class="col-4">
                  <h4>Company Branch Management</h4>
                </div>
                <div>
                  <vs-button v-on:click="onCreateUser()">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i> Create Company
                  </vs-button>
                </div>
              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <vs-dialog prevent-close width="700px" v-model="active">
                  <template #header>
                    <h4 class="not-margin" v-if="!user_id">
                      Create <b>Company</b>
                    </h4>
                    <h4 class="not-margin" v-if="user_id">
                      <b>Company Info</b>
                    </h4>
                  </template>
                  <div class="con-form">
                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="4" class="label-margin"> Company name:
                        <vs-input border v-model="company_name" placeholder="Enter company name" />
                      </vs-col>
                    </vs-row>

                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="4" class="label-margin" :class="{ 'error': $v.phone_number_company.$error }"> Phone number:
                        <vs-input border v-model="$v.phone_number_company.$model" placeholder="Enter phone number" />
                        <div v-if="!$v.phone_number_company.numeric">Phone number invalid</div>
                      </vs-col>
                      <vs-col vs-type="flex" w="2" class="label-margin">
                      </vs-col>
                      <vs-col vs-type="flex" w="4" class="label-margin"> Address:
                        <vs-input border v-model="company_address" placeholder="Enter address" />
                      </vs-col>

                    </vs-row>

                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="6" class="label-margin"> Open from:</vs-col>
                      <vs-col vs-type="flex" w="10">
                        <VueCtkDateTimePicker id="start_work_date" v-model="start_work_date" :outputFormat="'YYYY-MM-DD HH:mm:ss'" :formatted="'MM/DD/YYYY HH:mm'" :format="'MM/DD/YYYY HH:mm'" required></VueCtkDateTimePicker>
                      </vs-col>
                    </vs-row>
                  </div>
                  <div class="createAdmin">
                    <h4 class="not-margin" v-if="!user_id">
                      Create <b>Admin</b>
                    </h4>
                    <h4 class="not-margin" v-if="user_id">
                      <b>Admin Info</b>
                    </h4>
                  </div>
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
                  </div>
                  <template #footer>
                    <div class="footer-dialog">
                      <vs-button v-on:click="onSave(user_id)" block v-if="!user_id">
                        Create
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
                      <vs-th style="width: 200px" sort @click="listSave = $vs.sortData($event ,listSave, 'mst_company_id')">Company Name</vs-th>
                      <vs-th >Admin</vs-th>
                      <vs-th >Admin Email</vs-th>
                      <vs-th >Phone Number</vs-th>
                      <vs-th >Address</vs-th>
                      <vs-th >Open From</vs-th>
                      <vs-th class="center">Edit Company</vs-th>
                    </vs-tr>
                  </template>
                  <template #tbody>
                    <vs-tr :key="i" v-for="(tr, i) in $vs.getPage($vs.getSearch(listSave, search), page, max)"  :data="tr"  >
                      <vs-td>{{ tr.company_name}}</vs-td>
                      <vs-td>{{ tr.given_name }} {{tr.family_name}}</vs-td>
                      <vs-td>{{ tr.admin_email }}</vs-td>
                      <vs-td>{{ tr.phone_number }}</vs-td>
                      <vs-td>{{ tr.address }}</vs-td>
                      <vs-td>{{ tr.create_at }}</vs-td>
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
  name: 'Company',
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
      user_id: '',
      //create admin
      family_name: '',
      given_name:'',
      email: '',
      password: '',
      phone_number: '',
      address: '',
      state_flg: 0,
      user_flg: 0,
      create_user: localStorage.getItem('User'),
      //company
      company_name: '',
      phone_number_company: '',
      company_address:'',
      start_work_date: '',
    }
  },
  methods: {
    async getListCus() {
      this.listSave = await Axios.get(`http://localhost:8000/api/company/`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
    },
    onCreateUser(){
      this.active = true;
      this.user_id = '';
      //admin
      this.family_name = '';
      this.given_name = '';
      this.email = '';
      this.password = '';
      this.phone_number = '';
      this.address = '';
      //company
      this.company_name = '';
      this.phone_number_company = '';
      this.company_address ='';
      this.start_work_date = '';
    },
    async onEdit(tr) {
      this.active = true;
      if (tr.id){
        this.user_id = tr.id ;
        let companyDetail = await Axios.get(`http://localhost:8000/api/company/${tr.id}`)
            .then(response => {
              return Promise.resolve(response.data);
            })
            .catch(error => {
              error = error.response;
              const message = (error && error.data && error.data.message) || error.statusText;
              return Promise.reject(message);
            });
        console.log(companyDetail)
        //admin
        this.family_name = companyDetail['family_name'];
        this.given_name = companyDetail['given_name'];
        this.email = companyDetail['admin_email'];
        this.phone_number = companyDetail['admin_phone_number'];
        this.address = companyDetail['admin_address'];
        //company
        this.company_name = companyDetail['company_name'];
        this.phone_number_company = companyDetail['phone_number'];
        this.company_address = companyDetail['address'];
        this.start_work_date = companyDetail['create_at'];
      }
    },
    async onSave(id){

      let data = {
        //admin
        family_name : this.family_name,
        given_name : this.given_name,
        email : this.email,
        password : this.password,
        phone_number: this.phone_number,
        address: this.address,
        state_flg: this.state_flg,
        user_flg: this.user_flg,
        create_user: localStorage.getItem('User'),
        //company
        company_name: this.company_name,
        company_address: this.company_address,
        start_work_date: this.start_work_date,
        phone_number_company: this.phone_number_company,
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
          if (this.user_flg == 0){
            this.$vs.notification({
              title:'Update Admin success',
              progress: 'auto',
              color:'success',
              square: true,
            });
          }
          else {
            this.$vs.notification({
              title:'Update User Success',
              progress: 'auto',
              color:'success',
              square: true,
            });
          }
        }
        else {
          this.$vs.notification({
            title:'Update User/Admin False',
            square: true,
            color:'danger',
            progress: 'auto',
          })
        }
      }
      else {
        this.createStatus = await Axios.post(`http://localhost:8000/api/company`, data)
            .then(response => {
              return Promise.resolve(response.status);
            })
            .catch(error => {
              error = error.response;
              const message = (error && error.data && error.data.message) || error.statusText;
              return Promise.reject(message);
            });
        if (this.createStatus == 200){
          if (this.user_flg == 0){
            this.$vs.notification({
              title:'Create Admin success',
              progress: 'auto',
              color:'success',
              square: true,
            });
          }
          else {
            this.$vs.notification({
              title:'Create User Success',
              progress: 'auto',
              color:'success',
              square: true,
            });
          }
        }
        else {
          this.$vs.notification({
            title:'Create User/Admin False',
            square: true,
            color:'danger',
            progress: 'auto',
          })
        }
      }
      this.active = false;
      await this.getListCus();
    },

  },
  computed: {

  },
  mounted() {
    this.getListCus();
  },
  validations: {
    email: {
      email,
      required
    },
    phone_number: {
      numeric
    },
    phone_number_company:{
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
.createAdmin{
  text-align: center;
  padding: 10px 16px;
}
</style>
