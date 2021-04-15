<template>
    <div  class="d-flex align-items-center justify-content-center">
      <b-card
        style="max-width: 12rem;"
        v-bind:img-src="pokemon.sprites.other.dream_world.front_default"
        img-alt="Image"
        img-top
        class="mb-2 w-50 h-50"
       >
        <template #header>
              <b-card-title>{{pokemon.name}}</b-card-title>
        </template>
         <b-card-text>
            <h5>Peso: {{pokemon.weight}}</h5>
          </b-card-text>
        <template>
           <h4 class="mb-0">Habilidades</h4>
           <b-list-group v-for="(ability, index) in pokemon.abilities" :key="index">
              <b-list-group-item>{{ability.ability.name}}</b-list-group-item>
           </b-list-group>
          </template>
        <template #footer>
            <b-button href="#" variant="primary" v-on:click="DescargarEnTxt(pokemon.name, pokemon.sprites.front_default, pokemon.weight, pokemon.abilities)">Descargar</b-button>
        </template>
      </b-card>
    </div>
</template>

<script>
import { saveAs } from 'file-saver';

export default {
    data() {
        return {
            pokemon: {},
            id : ''
        }
    },
    methods:{
        getpokemon(){
         this.axios({
          url: `${this.$route.params.id}`,
          method: 'GET'
            }).then((response) => {
                this.pokemon = response.data;
            });
        },

        DescargarEnTxt(nombre, foto, peso, habilidades){
         
         const obtenerHabilidades = habilidades.map(function(habilidad) {
              return habilidad.ability.name;
          });
          var mensaje = `Nombre : ${nombre} \n Foto: ${foto} \n Peso: ${peso} \n habilidades: ${obtenerHabilidades}`;
          var blob = new Blob([mensaje], {type: "text/plain;charset=utf-8"});
           saveAs(blob, `${nombre}.txt`);
        }
    },

    created(){
      this.getpokemon();
    },
}
</script>