<template lang="html">
  <section class="home">
    <div class="center">
      <vs-button v-on:click="onCreateCategory()">
        Create category
      </vs-button>
      <vs-dialog prevent-close width="500px" v-model="active">
        <template #header>
          <h4 class="not-margin" v-if="!category_id">
            Create <b>Category</b>
          </h4>
          <h4 class="not-margin" v-if="category_id">
            Edit <b>Category</b>
          </h4>
        </template>

        <div class="center grid">
          <vs-row class="form-margin">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12"> Category Name:
              <vs-input v-model="category_name" placeholder="Enter category name" />
            </vs-col>
          </vs-row>

          <vs-row class="form-margin">
            <vs-col vs-type="flex" w="12" class="label-margin"> Type:</vs-col>
            <vs-col vs-type="flex" w="12">
              <vs-select placeholder="Select" v-model="type">
                <vs-option label="Cake" value="1">
                  Cake
                </vs-option>
                <vs-option label="Drink" value="2">
                  Drink
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
            <vs-col vs-type="flex" w="12" class="label-margin"> Sale off:
              <vs-input v-model="sale_off" placeholder="Enter category name" />
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
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button v-on:click="onSave(category_id)" block v-if="!category_id">
              Create
            </vs-button>
          </div>
          <div class="footer-dialog">
            <vs-button v-on:click="onSave(category_id)" block v-if="category_id">
              Update
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
    <vs-table striped>
      <template #thead>
        <vs-tr>
          <vs-th style="width: 200px">Category name</vs-th>
          <vs-th >Price</vs-th>
          <vs-th >Sale Off</vs-th>
          <vs-th >Create Date</vs-th>
          <vs-th >Create User</vs-th>
          <vs-th >Edit</vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(tr, i) in $vs.getPage(listSave, page, max)" :data="tr"  >
          <vs-td>{{ tr.category_name }}</vs-td>
          <vs-td>{{ tr.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) }}</vs-td>
          <vs-td>{{ tr.sale_off }}%</vs-td>
          <vs-td>{{ tr.create_at }}</vs-td>
          <vs-td>{{ tr.create_user }}</vs-td>
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

export default  {
  name: 'Category',
  props: [],
  data() {
    return {
      page: 1,
      max: 10,
      listSave: [],
      data:[],
      active: false,
      //create
      category_name: '',
      type: 0,
      price: '',
      sale_off: '',
      create_at: '',
      create_user: '',
      category_id: '',
      image: '',
      image_dir: '',
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.image_dir = files[0].name;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async getListCategory() {
      this.listSave = await Axios.get(`http://localhost:8000/api/category/`)
          .then(response => {
            return Promise.resolve(response.data);
          })
          .catch(error => {
            error = error.response;
            const message = (error && error.data && error.data.message) || error.statusText;
            return Promise.reject(message);
          });

    },
     onCreateCategory(){
      this.active = true;
      this.category_name = '';
      this.type = 0;
      this.price = '';
      this.sale_off = '';
      this.image = '';
      this.image_dir = '';
    },
    async onEdit(tr) {
      this.active = true;
      if (tr.id){
        this.category_id = tr.id;
        let categoryDetail = await Axios.get(`http://localhost:8000/api/category/${tr.id}`)
            .then(response => {
              return Promise.resolve(response.data);
            })
            .catch(error => {
              error = error.response;
              const message = (error && error.data && error.data.message) || error.statusText;
              return Promise.reject(message);
            });
        this.type = categoryDetail['type'];
        this.category_name = categoryDetail['category_name'];
        this.price = categoryDetail['price'];
        this.sale_off = categoryDetail['sale_off'];
        this.image_dir = categoryDetail['src'];
      }
    },

    async onSave(id) {
      let data = {
        type: this.type,
        category_name: this.category_name,
        price: this.price,
        sale_off: this.sale_off,
        create_user: localStorage.getItem('User'),
        src: this.image_dir,
      }

      if(id){
        data.id = id;
        this.updateStatus = await Axios.put(`http://localhost:8000/api/category/${data.id}`, data)
            .then(response => {
              return Promise.resolve(response.status);
            })
            .catch(error => {
              error = error.response;
              const message = (error && error.data && error.data.message) ;
              return Promise.reject(message);
            });
        if (this.updateStatus == 200){
          this.$vs.notification({
            title:'Update category success',
            progress: 'auto',
            color:'success',
            square: true,
          });
        }
        else {
          this.$vs.notification({
            title:'Update category false',
            square: true,
            color:'danger',
            progress: 'auto',
          })
        }
      }
      else{
         this.createStatus = await Axios.post(`http://localhost:8000/api/category`, data)
            .then(response => {
              return Promise.resolve(response.status);
            })
            .catch(error => {
              error = error.response;
              const message = (error && error.data && error.data.message);
              return Promise.reject(message);
            });
         if (this.createStatus == 200){
           this.$vs.notification({
             title:'Create category success',
             progress: 'auto',
             color:'success',
             square: true,
           });
         }
         else {
           this.$vs.notification({
             title:'Create category false',
             square: true,
             color:'danger',
             progress: 'auto',
           })
         }
      }

      this.active = false;
      await this.getListCategory();
    },
  },
  computed: {

  },
  mounted() {
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
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
