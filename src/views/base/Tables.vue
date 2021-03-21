<!--<template>-->
<!--  <div>-->
<!--    <CRow>-->
<!--      <CCol lg="6">-->
<!--        <CTableWrapper :items="getShuffledUsersData()">-->
<!--          <template #header>-->
<!--            <CIcon name="cil-grid"/> Simple Table-->
<!--            <div class="card-header-actions">-->
<!--              <a-->
<!--                href="https://coreui.io/vue/docs/components/nav"-->
<!--                class="card-header-action"-->
<!--                rel="noreferrer noopener"-->
<!--                target="_blank"-->
<!--              >-->
<!--                <small class="text-muted">docs</small>-->
<!--              </a>-->
<!--            </div>-->
<!--          </template>-->
<!--        </CTableWrapper>-->
<!--      </CCol>-->

<!--      <CCol lg="6">-->
<!--        <CTableWrapper-->
<!--          :items="getShuffledUsersData()"-->
<!--          striped-->
<!--          caption="Striped Table"-->
<!--        />-->
<!--      </CCol>-->
<!--    </CRow>-->

<!--    <CRow>-->
<!--      <CCol lg="6">-->
<!--        <CTableWrapper-->
<!--          :items="getShuffledUsersData()"-->
<!--          small-->
<!--          caption="Condensed Table"-->
<!--        />-->
<!--      </CCol>-->

<!--      <CCol lg="6">-->
<!--        <CTableWrapper-->
<!--          :items="getShuffledUsersData()"-->
<!--          fixed-->
<!--          border-->
<!--          caption="Bordered Table"-->
<!--        />-->
<!--      </CCol>-->
<!--    </CRow>-->

<!--    <CRow>-->
<!--      <CCol sm="12">-->
<!--        <CTableWrapper-->
<!--          :items="getShuffledUsersData()"-->
<!--          hover-->
<!--          striped-->
<!--          border-->
<!--          small-->
<!--          fixed-->
<!--          caption="Combined All Table"-->
<!--        />-->
<!--      </CCol>-->
<!--    </CRow>-->

<!--    <CRow>-->
<!--      <CCol sm="12">-->
<!--        <CTableWrapper-->
<!--          :items="getShuffledUsersData()"-->
<!--          hover-->
<!--          striped-->
<!--          border-->
<!--          small-->
<!--          fixed-->
<!--          dark-->
<!--          caption="Combined All dark Table"-->
<!--        />-->
<!--      </CCol>-->
<!--    </CRow>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import CTableWrapper from './Table.vue'-->
<!--import usersData from '../users/UsersData'-->
<!--import Axios from 'axios'-->
<!--export default {-->
<!--  name: 'Tables',-->
<!--  components: { CTableWrapper },-->
<!--  data() {-->
<!--    return {-->
<!--      listSave:[],-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    shuffleArray (array) {-->
<!--      for (let i = array.length - 1; i > 0; i&#45;&#45;) {-->
<!--        let j = Math.floor(Math.random() * (i + 1))-->
<!--        let temp = array[i]-->
<!--        array[i] = array[j]-->
<!--        array[j] = temp-->
<!--      }-->
<!--      return array-->
<!--    },-->
<!--    getShuffledUsersData () {-->
<!--      return this.shuffleArray(usersData.slice(0))-->
<!--    },-->
<!--    async getListCus(){-->
<!--      this.listSave =await Axios.get(`http://localhost:8000/api/customers/`)-->
<!--          .then(response => {-->
<!--            return Promise.resolve(response.data);-->
<!--          })-->
<!--          .catch(error => {-->
<!--            error = error.response;-->
<!--            const message = (error && error.data && error.data.message) || error.statusText;-->
<!--            return Promise.reject(message);-->
<!--          });-->

<!--      console.log(this.listSave);-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getListCus();-->
<!--  }-->
<!--}-->

<!--</script>-->
<template lang="html">
  <section class="home">
    <vs-table class="mt-3" noDataText="データがありません。" :data="listSave"  stripe sst>
      <template slot="thead">
        <vs-th >ID</vs-th>
        <vs-th >First Name</vs-th>
        <vs-th >Last Name</vs-th>
        <vs-th >Create At</vs-th>
        <vs-th >Update At</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
          <td >{{tr.id}}</td>
          <td >{{tr.first_name}}</td>
          <td >{{tr.last_name}}</td>
          <td >{{tr.created_at}}</td>
          <td >{{tr.updated_at}}</td>

        </vs-tr>
      </template>
    </vs-table>

  </section>
</template>

<script lang="js">
import Axios from 'axios'
import '@babel/polyfill'



export default  {
  name: 'Tables',
  props: [],
  data() {
    return {
      listSave: [],
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

      console.log(this.listSave);
    }
  },
  computed: {

  },
  mounted() {
    this.getListCus();
  }
}
</script>
