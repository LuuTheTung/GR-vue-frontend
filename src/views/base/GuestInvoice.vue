<template>
  <section class="home">
    <div>
      <CRow>
        <CCol sm="6">
          <transition name="fade">
            <CCard v-if="show">
              <CCardHeader>
                <strong>Create Invoice</strong>
              </CCardHeader>
              <CCollapse :show="formCollapsed">
                <CCardBody>
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
                      <vs-tr :key="i" v-for="(invoice, i) in $vs.getPage(userDetail, page, max)" :data="invoice"  >
                        <vs-td>{{ invoice.invoice_id }}</vs-td>
                        <vs-td>{{ invoice.category_name }}</vs-td>
                        <vs-td>{{ invoice.price }}</vs-td>
                        <vs-td>{{ invoice.quantity }}</vs-td>
                        <vs-td  @click="popList(i)" v-if="!user_id">
                          <vs-button >
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                          </vs-button></vs-td>
                      </vs-tr>
                    </template>
                    <template #footer>
                      <vs-pagination v-model="page" :length="$vs.getLength(userDetail, max)" />
                    </template>
                  </vs-table>
                  <div class="con-form">
                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="12" class="label-margin"> Total price: {{ this.total_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) }}
                      </vs-col>
                    </vs-row>
                  </div>
                  <div class="con-form" v-if="!user_id">
                    <vs-row>
                      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Category Name:
                        <vs-select filter :key="listCategory.length" v-model="category_name"  disabled>
                          <vs-option
                              v-for="(item,index) in listCategory"
                              :key="index"
                              :value="item.category_name"
                              :label="item.category_name"
                          >
                            {{item.category_name}}
                          </vs-option>
                        </vs-select>
                      </vs-col>
                      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Price:
                        <vs-input v-model="price" placeholder="Enter price" disabled/>
                      </vs-col>
                      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Quantity:
                        <vs-input type="number" v-model="quantity" disabled/>
                      </vs-col>
                    </vs-row>

                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="12" class="label-margin"> Image:
                        <div v-if="!image">
                          <input type="file" @change="onFileChange">
                        </div>
                        <div v-else>
                          <img :src="image" />
                        </div>
                      </vs-col>
                    </vs-row>

                    <vs-row class="form-margin">
                      <vs-col vs-type="flex" w="12" class="label-margin">
                        <vs-button v-on:click="deleteImage()">
                          Delete Image
                        </vs-button>
                        <vs-button v-on:click="onSave()">
                          Save Invoice
                        </vs-button>
                      </vs-col>
                    </vs-row>

                  </div>
                </CCardBody>
              </CCollapse>
            </CCard>
          </transition>
        </CCol>
        <CCol sm="6">
          <transition name="fade">
            <CCard v-if="show">
              <CCardHeader>
                <strong>Payment</strong>
              </CCardHeader>
              <CCollapse :show="paymentShow">
                <CCardBody>
                  <vs-row class="form-margin">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                      Confirm Invoice
                    </vs-col>
                  </vs-row>
                  <vs-row class="form-margin">
                      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Invoice ID:  {{this.invoiceDetail.invoice_id}}
                      </vs-col>
                      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
                        Price:  {{this.invoiceDetail.total_price}}
                      </vs-col>
                      <vs-button v-on:click="purchaseQR()">
                        Purchase
                      </vs-button>
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
import '@babel/polyfill';

export default {
name: "GuestInvoice",
  data(){
    return {
      show: true,
      formCollapsed: true,
      paymentShow: false,
      pageInvoice: 1,
      page: 1,
      max: 10,
      listSave: [],
      data: [],
      userDetail: [],
      listCategory: [],
      array: [],
      invoiceDetail:[],
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
      image: '',
      image_dir: '',
    }
  },
  methods:{
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
    },
    async getLastestInvoice() {
      console.log(this.create_user);
      this.invoiceDetail = await Axios.get(`http://localhost:8000/api/lastestInvoice/${this.create_user}`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
      console.log(this.invoiceDetail);
    },
    addToList(){
      if (this.userDetail.length > 0){
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
          this.image = '';
          this.image_dir = '';
        }
        else {
          this.userDetail.push({
            category_name: this.category_name,
            price: this.price,
            quantity: this.quantity,
            category_id: this.category_id,
            create_user: this.create_user,
            mst_company_id: localStorage.getItem('mst_company_id'),
          });
          this.total_price = parseFloat(this.price)*this.quantity + this.total_price;
          this.image = '';
          this.image_dir = '';
        }
      }
      else {
        if (this.category_name){
          this.userDetail.push({
            category_name: this.category_name,
            price: this.price,
            quantity: this.quantity,
            category_id: this.category_id,
            create_user: this.create_user,
            mst_company_id: localStorage.getItem('mst_company_id'),
          });
          this.total_price = parseFloat(this.price) * parseFloat(this.quantity);
          this.image = '';
          this.image_dir = '';
        }
      }
    },
    popList(index){
      this.userDetail.splice(index, 1);
      this.total_price = this.total_price - parseFloat(this.userDetail[index].price)*this.userDetail[index].quantity;
    },
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.image_dir = files[0].name;
      this.createImage(files[0]);
      let image_detected = await Axios.get(`http://localhost:3000/api/v1/resources/C:\\\\Users\\\\OrianInsec\\\\Documents\\\\GR2\\\\test\\\\${this.image_dir}`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });
      var name = image_detected[0];
      if (name){
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
        this.category_name = name;
        this.addToList();
      }
      else {
        console.log('not detected');
        this.$vs.notification({
          title:'Cake not Detected',
          square: true,
          color:'danger',
          progress: 'auto',
          position: 'top-center',
        })
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
      if (this.createStatus == 200){
        this.$vs.notification({
          title:'Create Invoice Success',
          progress: 'auto',
          color:'success',
          square: true,
        });
        this.paymentShow = true;
        await this.getLastestInvoice();
      }
      else {
        this.$vs.notification({
          title:'Create Invoice False',
          square: true,
          color:'danger',
          progress: 'auto',
        })
      }
      this.active = false;
    },
    purchaseQR(){
      window.open("http://localhost:5000/", '_blank');
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    deleteImage(){
      this.image = '';
      this.image_dir = '';
      this.category_name = '';
      this.price = '';
      this.quantity = 1;
    }
  },
  computed: {

  },
  watch:{

  },
  mounted() {
    this.getListCategory();

  },
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
.zoom {
  width: 80% !important;
}
</style>
