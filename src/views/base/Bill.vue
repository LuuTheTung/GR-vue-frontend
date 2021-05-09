<template lang="html">
  <section class="home">
    <div class="center">
      <vs-button v-on:click="onCreateUser()">
        Create Invoice
      </vs-button>
      <vs-dialog prevent-close width="700px" v-model="active">
        <template #header>
          <h4 class="not-margin" v-if="!user_id">
            Create <b>Invoice</b>
          </h4>
          <h4 class="not-margin" v-if="user_id">
            Show <b>Invoice</b>
          </h4>
        </template>
        <vs-table >
          <template #thead>
            <vs-tr>
              <vs-th >Invoice ID</vs-th>
              <vs-th >Category name</vs-th>
              <vs-th >Price</vs-th>
              <vs-th >Quantity</vs-th>
              <vs-th v-if="!user_id">Delete </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in $vs.getPage(userDetail, page, max)" :data="tr"  >
              <vs-td>{{ tr.invoice_id }}</vs-td>
              <vs-td>{{ tr.category_name }}</vs-td>
              <vs-td>{{ tr.price }}</vs-td>
              <vs-td>{{ tr.quantity }}</vs-td>
              <vs-td  @click="popList(i)" v-if="!user_id">
                <vs-button >
                  Delete
                </vs-button></vs-td>
            </vs-tr>
          </template>
          <template #footer>
            <vs-pagination v-model="page" :length="$vs.getLength(userDetail, max)" />
          </template>
        </vs-table>
        <div class="con-form" v-if="!user_id">
          <vs-row class="form-margin">
            <vs-col vs-type="flex" w="12" class="label-margin"> Total price: {{ this.total_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) }}
            </vs-col>
          </vs-row>

        </div>
        <div class="con-form" v-if="!user_id">
          <vs-row class="form-margin">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12"> Category Name:
              <vs-select filter v-model="category_name"  @change="onChange(category_name)">
                <vs-option :key="index"
                           :value="item.category_name"
                           :label="item.category_name"
                           v-for="(item,index) in listCategory"
                >
                  {{item.category_name}}
                </vs-option>
              </vs-select>
            </vs-col>
          </vs-row>

          <vs-row class="form-margin">
            <vs-col vs-type="flex" w="12" class="label-margin"> Price:
              <vs-input v-model="price" placeholder="Enter price" />
            </vs-col>
          </vs-row>

          <vs-row class="form-margin">
            <vs-col vs-type="flex" w="12" class="label-margin"> Quantity:
              <vs-input type="number" v-model="quantity"/>
            </vs-col>
          </vs-row>

          <vs-button v-on:click="addToList()" v-if="!user_id">
            Add to list
          </vs-button>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button v-on:click="onSave()" block v-if="!user_id">
              Export Invoice & Save
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>

    <vs-table>
      <template #header>
        <vs-input v-model="search" border placeholder="Search"/>
      </template>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="listSave = $vs.sortData($event ,listSave, 'invoice_id')">
            Invoice ID
          </vs-th>
          <vs-th >Invoice Total</vs-th>
          <vs-th >Create Date</vs-th>
          <vs-th >Edit</vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(tr, i) in $vs.getPage($vs.getSearch(listSave, search), page, max)"  :data="tr"  >
          <vs-td>{{ tr.invoice_id }}</vs-td>
          <vs-td>{{ tr.total_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) }}</vs-td>
          <vs-td>{{ tr.create_at }}</vs-td>
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
  name: 'Bill',
  props: [],
  data() {
    return {
      page: 1,
      max: 10,
      listSave: [],
      data:[],
      userDetail: [],
      listCategory: [],
      array:[],
      active: false,
      user_id: '',
      //create
      category_name: '',
      price: '',
      quantity: 1,
      category_id: '',
      total_price: 0,
      total_quantity: 0,
      create_user: localStorage.getItem('User'),
      search: '',
    }
  },
  methods: {
    async getListCus(create_user) {
      this.listSave = await Axios.get(`http://localhost:8000/api/invoiceByUser/${create_user}`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
    },
    async getListCategory() {
      this.listCategory = await Axios.get(`http://localhost:8000/api/category/`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
      console.log(this.listCategory);
    },
    async onChange(name){
      let categoryDetail = await Axios.get(`http://localhost:8000/api/categoryName/${name}`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
      this.price = categoryDetail['price'];
      this.quantity = 1;
      this.category_id = categoryDetail['id'];
    },
    addToList(){
      if (this.userDetail.length > 0){
        console.log(this.category_name);
        var exist = false;
        var id = 0;
        for (var j = 0; j < this.userDetail.length; j++) {
          if (this.userDetail[j].category_name === this.category_name){
            exist = true;
            id = j;
          }
        }
        if (exist === true){
          this.userDetail[id].quantity = parseFloat(this.userDetail[id].quantity) + parseFloat(this.quantity);
          this.total_price = parseFloat(this.userDetail[id].price)*this.quantity + this.total_price;
        }
        else {
          this.userDetail.push({
            category_name: this.category_name,
            price: this.price,
            quantity: this.quantity,
            category_id: this.category_id,
            create_user: this.create_user,
          });
          this.total_price = parseFloat(this.price)*this.quantity + this.total_price;
        }
      }
      else {
        this.userDetail.push({
          category_name: this.category_name,
          price: this.price,
          quantity: this.quantity,
          category_id: this.category_id,
          create_user: this.create_user,
        });
        this.total_price = parseFloat(this.price) * parseFloat(this.quantity);

      }
      console.log(this.userDetail);
    },
    popList(index){
      this.userDetail.splice(index, 1);
      this.total_price = this.total_price - parseFloat(this.userDetail[index].price)*this.userDetail[index].quantity;
    },
    onCreateUser(){
      this.active = true;
      this.user_id = '';
      this.category_name = '';
      this.price = '';
      this.quantity = 1;
      this.category_id = '';
      this.userDetail = [];
      this.total_price = 0;
      this.total_quantity = 0;
    },
    async onEdit(tr) {
      this.active = true;
      if (tr.id){
        this.user_id = tr.id ;
        this.userDetail = await Axios.get(`http://localhost:8000/api/invoice/${tr.id}`)
            .then(response => {
              return Promise.resolve(response.data);
            })
            .catch(error => {
              error = error.response;
              const message = (error && error.data && error.data.message) || error.statusText;
              return Promise.reject(message);
            });

      }
    },
    async onSave() {
      let data = this.userDetail;
      this.createStatus = await Axios.post(`http://localhost:8000/api/invoice`, data)
          .then(response => {
            return Promise.resolve(response.status);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });

      this.active = false;
      await this.getListCus(this.create_user);
    }

  },
  computed: {

  },
  watch:{

  },
  mounted() {
    this.getListCus(this.create_user);
    this.getListCategory();
  },
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
</style>
