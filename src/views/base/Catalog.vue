<template>
  <section class="home">
    <div>
      <h4>Cake:</h4>
      <vs-card-group>
        <vs-card :key="i" v-for="(card,i) in listSave" >
          <template #title>
            <h3>{{card.category_name}}</h3>
          </template>
          <template #img>
            <img :src="`/img/${card.src}`" alt="">
          </template>
          <template #text>
            <p>
              {{card.price}}Đ
            </p>
          </template>
        </vs-card>
      </vs-card-group>
    </div>
    <div>
      <h4>Drink:</h4>
      <vs-card-group>
        <vs-card :key="i" v-for="(card,i) in listSave" >
          <template #title>
            <h3>{{card.category_name}}</h3>
          </template>
          <template #img>
            <img :src="`/img/${card.src}`" alt="">
          </template>
          <template #text>
            <p>
              {{card.price}}Đ
            </p>
          </template>
        </vs-card>
      </vs-card-group>
    </div>
  </section>



</template>

<script>
import Axios from "axios";

export default {
name: "Catalog",
  data() {
    return {
      card: [],
      listSave: [],
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
      console.log(this.listSave);
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
</style>
