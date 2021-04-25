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
            <b-col cols="12" md="3" v-for="(pokemon, index) in searchPokemones" :key="index">
                <b-card class="ml-3 mb-3 mr-3" v-if="!Name == ''" >
                    <b-card-text>{{pokemon.name}}</b-card-text>
                    <b-button href="#" variant="primary" v-on:click="obtenerid(pokemon.url)">Detalle</b-button>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'Pokemon',

    created() {
        this.$store.dispatch('getPokemones');
    },

    methods: {
        obtenerid(dato){
            const datos = dato.substr(26);
            this.$router.push({name:'DetallePokemon', params: {id: datos}});
        },
    },
    computed:{
        pokemones:{
            get: function() {
                return this.$store.getters['getPokemones'];
            },
        },
         Name:{
            // getter
            get: function () {
                return this.$store.state.Name;
            },
            // setter
            set: function (newValue) {
                this.$store.state.Name = newValue;
            }
        },

        searchPokemones: function () {
          return this.pokemones.filter((item) => item.name.includes(this.Name));
        },
    },
}
</script>