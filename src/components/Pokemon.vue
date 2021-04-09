<template>
    <div>
        <div>
            <b-row >
                <b-col class="col-md-6 offset-md-3">
                    <b-form-input class="text-center" type="text" v-model="Name" placeholder="Buscar Poquemon..."></b-form-input>
                </b-col>
            </b-row>
        </div>
        
        <b-row class="mt-5">
            <b-col cols="12" md="3" v-for="(pokemon, index) in searchPokemones" v-bind:key="index">
                <b-card class="ml-3 mb-3 mr-3" v-if="!Name == ''" >
                 <b-card-text>{{pokemon.name}}</b-card-text>
                 <b-button href="#" variant="primary" v-on:click="obtenerid(pokemon.url)">Descargar</b-button>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'Pokemon',

    data() {
        return {
            pokemones: [],
            Name: "",
        }
    },

    created() {
        this.getPokemones();
    },

    methods: {
        async getPokemones(){
           try {

               const entradas = await this.axios.get('Pokemon')

               console.log(entradas.data.results);
               await entradas.data.results.forEach(element => {
                   let item = {}
                   item.name = element.name;
                   item.url = element.url;
                   this.pokemones.push(item)
               });

           } catch (error) {

               console.log(error);
           }
        },

        obtenerid(dato){
            let datos = dato.substr(26);
            this.getpokemon(datos)
        },
        
       getpokemon(id){
         this.axios({
          url: `${id}`,
          method: 'GET',
          responseType: 'blob',
         }).then((response) => {
             console.log(response.data);
            var fileURL =  window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'file.txt');
            document.body.appendChild(fileLink); 

            fileLink.click();
         });

        }
    },
    computed:{
        searchPokemones: function () {
            return this.pokemones.filter((item) => item.name.includes(this.Name));
        }
    }
}
</script>