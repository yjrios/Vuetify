<template>
    <v-container class="pa-px-0 mx-0">
        <v-footer
        padless
        absolute
        >
          <v-row class="mx-0">
            <v-spacer></v-spacer>
            
            <v-col cols="11" lg="11" md="11" sm="11" xs="11" class="ma-0 pa-0">
              <v-card
              flat
              tile
              class="text-right pt-5"
              >
                <v-card-text class="tipofuente success--text mx-0 py-0 my-0">
                    <strong>SIPGER</strong> — 
                    IT. 2023
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="1" lg="1" md="1" sm="1" xs="1" class="ma-0 pa-0">
              <v-card
              flat
              tile
              class="text-left"
              >
                <img height="auto" width="40" src="../assets/logosipger.svg" style="opacity:0.7;margin-bottom:0;padding-bottom:0;" />
              </v-card>
            </v-col>
          </v-row>
        </v-footer>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ]
    }),
  }
</script>

<style scoped>

.tipofuente {
  font-family: 'Roboto Slab', serif;
  font-size: 20px;
  font-weight: 900;
  opacity: 0.3;
}

</style>
