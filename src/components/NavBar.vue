<template>
  <v-app-bar
    id="app-bar"
    app
    color="transparent"
    flat
    height="75"
    collapse-on-scroll
    min-width="10%"
  >
  
    <div class="mx-3" />
    <v-app-bar-nav-icon @click="menuBarra = true"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    <v-menu
      bottom
      left
      offset-x
      origin="top rigth"
      transition="fab-transition"
      v-model="menuBarra"
    >
      <v-list
        :tile="false"
        nav
      >
        <div>
        <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
        >
            <v-list-item-title v-text="n" />
        </app-bar-item>
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
      menuBarra: false
    }),

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  }
</script>
