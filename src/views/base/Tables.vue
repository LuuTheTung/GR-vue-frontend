<template lang="html">
  <section class="home">
    <div class="center">
      <vs-button v-on:click="onCreateUser()">
        Create Account
      </vs-button>
      <vs-dialog prevent-close width="700px" v-model="active">
        <template #header>
          <h4 class="not-margin">
            Create <b>User/Admin</b>
          </h4>
        </template>
        <div class="con-form">
          <vs-row class="form-margin">
            <vs-col vs-type="flex" w="6" class="label-margin"> Company branch:</vs-col>
            <vs-col vs-type="flex" w="12">
              <vs-select placeholder="Select" v-model="mst_company_id">
                <vs-option label="Ha noi" value="1">
                  Ha noi
                </vs-option>
                <vs-option label="Ho Chi Minh" value="2">
                  Ho Chi Minh
                </vs-option>
              </vs-select>
            </vs-col>
          </vs-row>


          <vs-row class="form-margin">
            <vs-col vs-type="flex" w="6" class="label-margin"> Given Name:
              <vs-input v-model="given_name" placeholder="Enter given name" />
            </vs-col>
            <vs-col vs-type="flex" w="6" class="label-margin"> Family Name:
              <vs-input v-model="family_name" placeholder="Enter family name" />
            </vs-col>
          </vs-row>

          <vs-row class="form-margin">
            <vs-col vs-type="flex" w="6" class="label-margin" :class="{ 'error': $v.email.$error }"> Email:
              <vs-input v-model="$v.email.$model" placeholder="Enter email" />
              <div  v-if="!$v.email.email">Email invalid</div>
            </vs-col>
            <vs-col vs-type="flex" w="6" class="label-margin"> Password:
              <vs-input type="password"  v-model="password" placeholder="Enter password" ></vs-input>
            </vs-col>
          </vs-row>

          <vs-row class="form-margin">
            <vs-col vs-type="flex" w="6" class="label-margin" :class="{ 'error': $v.phone_number.$error }"> Phone number:
              <vs-input v-model="$v.phone_number.$model" placeholder="Enter phone number" />
              <div v-if="!$v.phone_number.numeric">Phone number invalid</div>
            </vs-col>
            <vs-col vs-type="flex" w="6" class="label-margin"> Address:
              <vs-input v-model="address" placeholder="Enter address" />
            </vs-col>

          </vs-row>

          <vs-row class="form-margin">
            <vs-col class="label-margin"> State:</vs-col>
              <vs-radio v-model="state_flg" val="0">
                Working
              </vs-radio>
              <vs-radio disabled v-model="state_flg" val="1">
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
              <VueCtkDateTimePicker id="end_work_date" disabled v-model="end_work_date"></VueCtkDateTimePicker>
            </vs-col>
          </vs-row>

          <vs-row class="form-margin">
            <vs-col class="label-margin"> Role:</vs-col>
            <vs-radio v-model="user_flg" val="0">
              Admin
            </vs-radio>
            <vs-radio v-model="user_flg" val="1">
              User
            </vs-radio>
          </vs-row>

        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button v-on:click="onSave(user_id)" block>
              Create
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
    <vs-table >
      <template #thead>
        <vs-tr>
          <vs-th style="width: 200px">Company Branch</vs-th>
          <vs-th >First Name</vs-th>
          <vs-th >Last Name</vs-th>
          <vs-th >Email</vs-th>
          <vs-th >Phone Number</vs-th>
          <vs-th >Address</vs-th>
          <vs-th >Role</vs-th>
          <vs-th >Work From</vs-th>
          <vs-th >Reject From</vs-th>
          <vs-th >Edit</vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(tr, i) in $vs.getPage(listSave, page, max)" :data="tr"  >
          <vs-td>{{ tr.mst_company_id | filterCompany}}</vs-td>
          <vs-td>{{ tr.family_name }}</vs-td>
          <vs-td>{{ tr.given_name }}</vs-td>
          <vs-td>{{ tr.email }}</vs-td>
          <vs-td>{{ tr.phone_number }}</vs-td>
          <vs-td>{{ tr.address }}</vs-td>
          <vs-td>{{ tr.user_flg |filterRole}}</vs-td>
          <vs-td>{{ tr.start_work_date }}</vs-td>
          <vs-td>{{ tr.end_work_date }}</vs-td>
          <vs-td  @click="onEdit(tr)">
            <vs-button >
              Edit
            </vs-button></vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(listSave, max)" />
      </template>
    </vs-table>

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
      page: 1,
      max: 10,
      listSave: [],
      data:[],
      // userDetail: [],
      active: false,
      //create
      mst_company_id: 1,
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
      user_id: ''
    }
  },
  methods: {
    async getListCus() {
      this.listSave = await Axios.get(`http://localhost:8000/api/customers/`)
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
      this.mst_company_id = 1;
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
        end_work_date: '',
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
  filters: {
    filterCompany: function(value) {
      if (value === 1)
      return 'Ha noi';
      else  if (value === 2) return 'Ho Chi Minh'
    },
    filterRole: function(value) {
      if (value === 0)
      return 'Admin';
      else  if (value === 1) return 'User'
    },
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
</style>
