<template>
    <div>
        <h2>Detalle de Pokemon</h2>
         <template v-if="!pokemon.notFound">
        <h2 class="title">{{pokemon.name}}</h2>
        <div class="row">
          <div class="col col-xs-4">
            <b>General Info</b>
            <p>Height: {{pokemon.height}}</p>
            <p>Weight: {{pokemon.weight}}</p>
          </div>
          <div class="col col-xs-4">
            <b>Abilities</b>
            <p v-for="(ability, index) in pokemon.abilities" :key="index">{{ability.ability.name}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-6 col-sm-3">
            <img :src="pokemon.sprites.front_default" alt="Front" width="100%">
          </div>
        </div>
      </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pokemon: {}
        }
    },
    methods:{
        mostrarId(){
            this.$route.params.id;
            console.log(this.$route.params.id)
        },
        
        getpokemon(){
         this.axios({
          url: `${this.$route.params.id}`,
          method: 'GET'
            }).then((response) => {
                this.pokemon = response.data;
                console.log(this.pokemon)
                    
            });
        }
    },

    created(){
        this.mostrarId();
        this.getpokemon();
    },



}
</script>