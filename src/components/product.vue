<template>
<div>
    <v-card
        width="250"
        max-height="250"
        @click="check_in_cart"
    >
        <v-card-text class="justify-center">
            <v-row>
                <v-img
                    :src="imgURL"
                    max-height="130"
                    max-width="130"
                    class="justify-center"
                ></v-img>
            </v-row>
            <v-row
                align="end"
            >
                <v-card-title> {{name}} </v-card-title>
            </v-row>
            <v-row
                no-gutters
                align="start"
            >
                <v-col>
                    <v-card-subtitle>$ {{price}}</v-card-subtitle>
                </v-col>
                <v-col>
                    <v-rating
                        :value="rate"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="18"
                    ></v-rating>
                </v-col>
                
            </v-row>
        </v-card-text>
    </v-card>
    <v-dialog 
        v-model="detailsDiaglog"
        max-width="600"
        overlay-color="blue"
    >
        <v-card>
            <v-card-text class="justify-center">
                <v-row>
                    <v-btn class="mx-2" fab dark small color="error" @click="detailsDiaglog = false"><v-icon>mdi-window-close</v-icon></v-btn>
                    <v-img 
                    :src="imgURL"
                    max-height="450"
                    max-width="450"
                    ></v-img>
                </v-row>
                <v-row>
                    <v-card-title class="display-1 text--primary"> {{name}} </v-card-title>
                    <v-rating
                        :value="rate"
                        color="amber"
                        dense
                        half-increments
                        size="30"
                    ></v-rating>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card-subtitle> {{description}} </v-card-subtitle>
                    </v-col>
                    <v-col>
                        <v-card-subtitle> En Stock: {{stock}} </v-card-subtitle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    <v-card-title class="display-1 text--primary">$ {{price}}</v-card-title>
                    </v-col>
                    <v-col>
                    <v-btn v-show="!inCart" @click="add_to_cart"> Agregar a carrito </v-btn>
                    <v-card-text v-show="inCart"> Producto en el carrito </v-card-text>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name:'productCard',
    props:['name','description','imgURL','stock','rate','price'],
    data () {
        return {
            detailsDiaglog: false,
            inCart:false
        }
    },
    methods:{
        add_to_cart(){
            this.inCart = true
            let product = JSON.stringify({name: this.name, description: this.description, imgURL: this.imgURL, stock: this.stock, price:this.price})
            this.$cookie.set(this.name, product, 1)
        },
        check_in_cart(){
            this.detailsDiaglog = true
            if (this.$cookie.get(this.name) != null){
                this.inCart = true
            }
        }
    }
}
</script>

<style>

</style>