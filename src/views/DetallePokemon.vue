<template>
    <div  class="d-flex align-items-center justify-content-center">
      <b-card
        style="max-width: 12rem;"
        v-bind:img-src="`${pokemon.imagen}`" 
        img-alt="Image"
        img-top
        class="mb-2 w-50 h-50"
       >
        <template #header>
              <b-card-title>{{pokemon.nombre}}</b-card-title>
        </template>
         <b-card-text>
            <h5>Peso: {{pokemon.peso}}</h5>
          </b-card-text>
        <template>
           <h4 class="mb-0">Habilidades</h4>
           <b-list-group v-for="(ability, index) in pokemon.habilidades" :key="index">
              <b-list-group-item>{{ability.ability.name}}</b-list-group-item>
           </b-list-group>
          </template>
        <template #footer>
            <b-button href="#" variant="primary" v-on:click="DescargarEnTxt(pokemon.nombre, pokemon.imagen, pokemon.peso, pokemon.habilidades)">Descargar</b-button>
        </template>
      </b-card>
    </div>
</template>

<script>
import { saveAs } from 'file-saver';

export default {
name: 'DetallePokemon',
  data() {
    return {
        pokemon:{
          nombre: '',
          peso: 0,
          imagen: '',
          habilidades: {},
        }
    }
    
  },
  computed:{

    id: function(){
      return this.$route.params.id;
    }
     
  },

  methods:{
      getpokemon(){
        this.axios({
        url: `${this.id}`,
        method: 'GET'
          }).then((response) => {
            this.pokemon.nombre = response.data.name,
            this.pokemon.peso =  response.data.weight,
            this.pokemon.imagen = response.data.sprites.other.dream_world.front_default,
            this.pokemon.habilidades = response.data.abilities
          })
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