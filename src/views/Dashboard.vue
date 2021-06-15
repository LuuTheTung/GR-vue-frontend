<template>
  <section class="home">
    <div>
      <CRow>
        <CCol sm="6">
          <transition name="fade">
            <CCard v-if="show">
              <CCardHeader>
                <strong>Today Income</strong>
              </CCardHeader>
              <CCollapse :show="formCollapsed">
                <CCardBody style="height: 300px">
                  <vs-row class="form-margin" >
                    <vs-col vs-type="flex" w="6" style="text-align: center; padding-top: 50px;">
                      <h4>{{this.listSave.total_invoice == null ? this.listSave.total_invoice = 0: this.listSave.total_invoice}}</h4>
                    </vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css">
                      <h4>{{this.listSave.income == null ? this.listSave.income = 0: this.listSave.income.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</h4>
                    </vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css">Invoice Created</vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css">Total Income</vs-col>
                  </vs-row>
                </CCardBody>
              </CCollapse>
            </CCard>
          </transition>
        </CCol>
        <CCol sm="6">
          <transition name="fade">
            <CCard v-if="show">
              <CCardHeader>
                <strong>Current Month Income</strong>
              </CCardHeader>
              <CCollapse :show="formCollapsed">
                <CCardBody style="height: 300px">
                  <vs-row class="form-margin">
                    <vs-col vs-type="flex" w="6" class="text-css">
                      <h4>{{this.monthIncome.totalInvoice == null ? this.monthIncome.totalInvoice = 0: this.monthIncome.totalInvoice}}</h4>
                    </vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css">
                      <h4>{{this.monthIncome.totalIncome == null ? this.monthIncome.totalIncome = 0: parseInt(this.monthIncome.totalIncome).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</h4>
                    </vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css"> Invoice Created
                    </vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css"> Total Income
                    </vs-col>
                  </vs-row>
                </CCardBody>
              </CCollapse>
            </CCard>
          </transition>
        </CCol>
        <CCol sm="12" v-if="this.role == 0">
          <transition name="fade">
            <CCard v-if="show">
              <CCardHeader>
                <strong>User Income</strong>
              </CCardHeader>
              <CCollapse :show="formCollapsed">
                <CCardBody>
                  <vs-row class="form-margin" >
                    <vs-col vs-type="flex" w="2"> Select User:
                    </vs-col>
                    <vs-col vs-type="flex" w="9" class="label-margin">
                      <vs-select :key="listUser.length" v-model="email"  @change="onChange(email)">
                        <vs-option
                            v-for="field in listUser"
                            :key="field.email"
                            :label="field.given_name+' '+field.family_name"
                            :value="field.email"
                        >
                          {{ field.given_name }} {{ field.family_name }}
                        </vs-option>
                      </vs-select>
                    </vs-col>
                  </vs-row>
                </CCardBody>
              </CCollapse>
            </CCard>
          </transition>
        </CCol>

        <CCol sm="6" v-if="this.role == 0">
          <transition name="fade">
            <CCard v-if="show">
              <CCardHeader>
                <strong>User Today Income</strong>
              </CCardHeader>
              <CCollapse :show="formCollapsed">
                <CCardBody style="height: 300px">
                  <vs-row class="form-margin" >
                    <vs-col vs-type="flex" w="6" style="text-align: center; padding-top: 50px;">
                      <h4>{{this.userDetail.total_invoice == null ? this.userDetail.total_invoice = 0: this.userDetail.total_invoice}}</h4>
                    </vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css">
                      <h4>{{this.userDetail.income == null ? this.userDetail.income = 0: this.userDetail.income.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</h4>
                    </vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css">Invoice Created</vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css">Total Income</vs-col>
                  </vs-row>
                </CCardBody>
              </CCollapse>
            </CCard>
          </transition>
        </CCol>

        <CCol sm="6" v-if="this.role == 0">
          <transition name="fade">
            <CCard v-if="show">
              <CCardHeader>
                <strong>User Current Month Income</strong>
              </CCardHeader>
              <CCollapse :show="formCollapsed">
                <CCardBody style="height: 300px">
                  <vs-row class="form-margin">
                    <vs-col vs-type="flex" w="6" class="text-css">
                      <h4>{{this.monthDetail.totalInvoice == null ? this.monthDetail.totalInvoice = 0: this.monthDetail.totalInvoice}}</h4>
                    </vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css">
                      <h4>{{this.monthDetail.totalIncome == null ? this.monthDetail.totalIncome = 0: parseInt(this.monthDetail.totalIncome).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</h4>
                    </vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css"> Invoice Created</vs-col>
                    <vs-col vs-type="flex" w="6" class="text-css"> Total Income</vs-col>
                  </vs-row>
                </CCardBody>
              </CCollapse>
            </CCard>
          </transition>
        </CCol>
      </CRow>
    </div>
  </section>
</template>

<script>


import Axios from "axios";
import '@babel/polyfill'
export default {
  name: 'Dashboard',
  components: {

  },
  data () {
    return {
      show: true,
      formCollapsed: true,
      create_user: localStorage.getItem('User'),
      listSave: [],
      monthIncome:[],
      listUser: [],
      email: '',
      userDetail:[],
      role: localStorage.getItem('role'),
      monthDetail:[],
    }
  },
  methods: {
    async getTodayIncome(create_user) {
      this.listSave = await Axios.get(`http://localhost:8000/api/incomeStatement/${create_user}`)
          .then(response => {
            return Promise.resolve(response.data);
          });
    },
    async getMonthIncome(create_user) {
      this.monthIncome = await Axios.get(`http://localhost:8000/api/incomeStatementByMonth/${create_user}`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
    },
    async getListUser(create_user) {
      this.listUser = await Axios.get(`http://localhost:8000/api/userByAdmin/${create_user}`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
    },
    async onChange(name){
      this.userDetail = await Axios.get(`http://localhost:8000/api/incomeStatement/${name}`)
          .then(response => {
            return Promise.resolve(response.data);
          })
      this.monthDetail = await Axios.get(`http://localhost:8000/api/incomeStatementByMonth/${name}`)
          .then(response => {
            return Promise.resolve(response.data);
          })
    },
  },
  mounted() {
    if(!localStorage.getItem('User')){
      this.$router.push('/pages/login');
    }
    this.getTodayIncome(this.create_user);
    this.getMonthIncome(this.create_user);
    this.getListUser(this.create_user);
  }
}
</script>
<style scoped>
.home{
  margin-left: 60px;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
.text-css{
  text-align: center;
  padding-top: 50px;
}
</style>
