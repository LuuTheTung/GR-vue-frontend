<template>
  <section class="home">
    <div>
      <CRow>
        <CCol sm="12">
            <CCard>
              <CCardHeader>
                <h4><i class="fa fa-birthday-cake" aria-hidden="true"></i> Cake:</h4>
              </CCardHeader>
              <CCollapse :show="formCollapsed">
                <CCardBody>
                 <div>
                   <vs-card-group>
                     <vs-card :key="i" v-for="(card,i) in listCake" >
                       <template #title>
                         <h3>{{card.category_name}}</h3>
                       </template>
                       <template #img>
                         <img :src="`/img/${card.src}`" alt="">
                       </template>
                       <template #text>
                         <p>
                           {{card.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}
                         </p>
                       </template>
                     </vs-card>
                   </vs-card-group>
                 </div>
                </CCardBody>
              </CCollapse>
            </CCard>
        </CCol>
        <CCol sm="12">
            <CCard>
              <CCardHeader>
                <h4><i class="fa fa-coffee" aria-hidden="true"></i> Drink:</h4>
              </CCardHeader>
              <CCollapse :show="formCollapsed">
                <CCardBody>
                  <div>
                    <vs-card-group>
                      <vs-card :key="i" v-for="(card,i) in listDrink" >
                        <template #title>
                          <h3>{{card.category_name}}</h3>
                        </template>
                        <template #img>
                          <img :src="`/img/${card.src}`" alt="">
                        </template>
                        <template #text>
                          <p>
                            {{card.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}
                          </p>
                        </template>
                      </vs-card>
                    </vs-card-group>
                  </div>
                </CCardBody>
              </CCollapse>
            </CCard>
        </CCol>
      </CRow>
    </div>
  </section>
</template>

<script>
import Axios from "axios";

export default {
name: "Catalog",
  data() {
    return {
      formCollapsed: true,
      card: [],
      listSave: [],
      listCake:[],
      listDrink:[],
    }
  },
  methods: {
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
      for (var j = 0; j < this.listSave.length; j++) {
        if(this.listSave[j].type == 1){
          this.listCake.push(this.listSave[j]);
        }
        else this.listDrink.push(this.listSave[j]);
      }

    }
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
h4{
  font: 700 25px 'Libre Caslon Text', Georgia, Times New Roman, serif;
}
</style>
