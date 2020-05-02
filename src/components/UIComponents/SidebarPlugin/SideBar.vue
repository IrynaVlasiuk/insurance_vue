<template>
    <div :class="sidebarClasses"
         :data-background-color="backgroundColor"
         :data-active-color="activeColor">
        <a class="simple-text logo-mini" href="/">
            <div class="logo">
                <div class="logo-img"><img :src="logo" alt=""></div>
                <div class="simple-text logo-normal">GEDOSIN
                    <small class="small">{{$store.getters.instance}}</small>
                </div>
            </div>
        </a>

        <div class="sidebar-wrapper" ref="sidebarScrollArea">
            <a class="simple-text logo-mini" href="/profile">
                <div class="user">
                    <div class="photo"><img src="static/img/userpic.png"></div>
                    <div class="info user-info">{{$store.getters.currentUser.full_name}}
                        <br>
                        <small>{{ $t('user_types.' + $store.getters.userRole)}}</small>
                    </div>
                </div>
            </a>

            <ul :class="navClasses">
                <slot name="links">
                    <sidebar-item v-for="(link, index) in sidebarLinks"
                                  :key="link.name + index"
                                  :link="link">
                        <sidebar-item v-for="(subLink, index) in link.children"
                                      :key="subLink.name + index"
                                      :link="subLink">
                        </sidebar-item>
                    </sidebar-item>
                </slot>

                <li class="desktop-hidden">
                    <a @click="languagesDisplayed = !languagesDisplayed">
                        <i class="ti-world"></i>
                        <p>Language</p>
                    </a>

                    <ul class="nav languages"  v-if="languagesDisplayed">
                        <li>
                            <a @click="setLanguage('en')">
                                <span class="sidebar-mini">E</span>
                                <span class="sidebar-normal">English</span></a>
                        </li>
                        <li>
                            <a @click="setLanguage('fr')">
                                <span class="sidebar-mini">F</span>
                                <span class="sidebar-normal">French</span></a>
                        </li>
                    </ul>

                </li>


                <li class="desktop-hidden">
                    <a @click="logout">
                        <i class="ti-direction"></i>
                        <p>Logout</p>
                    </a>
                </li>
            </ul>
        </div>


    </div>
</template>
<script>
  export default {
    data: function() {
      return {
            languagesDisplayed: false,
      }
    },
    props: {
      title: {
        type: String,
        default: 'Paper Dashboard Pro'
      },
      type: {
        type: String,
        default: 'sidebar',
        validator: (value) => {
          let acceptedValues = ['sidebar', 'navbar']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      backgroundColor: {
        type: String,
        default: 'black',
        validator: (value) => {
          let acceptedValues = ['white', 'brown', 'black']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      activeColor: {
        type: String,
        default: 'success',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      logo: {
        type: String,
        /* default: 'static/img/vue-logo.png' */
        default: '/static/img/gedosin-small-icon.png'
      },
      sidebarLinks: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      sidebarClasses () {
        if (this.type === 'sidebar') {
          return 'sidebar'
        } else {
          return 'collapse navbar-collapse off-canvas-sidebar'
        }
      },
      navClasses () {
        if (this.type === 'sidebar') {
          return 'nav'
        } else {
          return 'nav navbar-nav'
        }
      }
    },
    methods: {
      async initScrollBarAsync () {
        // await import('perfect-scrollbar/dist/css/perfect-scrollbar.css')
        // const PerfectScroll = await import('perfect-scrollbar')
        // PerfectScroll.initialize(this.$refs.sidebarScrollArea)
      },
      logout: function () {
        this.$store.dispatch('logout').then(res => {
          this.$router.push('/login')
        })
      },
      setLanguage: function (lang) {
        this.$store.dispatch('setUserLocale',lang).then(res => {
          this.$i18n.locale = lang;
        })
      },
    },
    mounted () {
      this.initScrollBarAsync()
    },
    beforeDestroy () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false
      }
    }
  }

</script>
<style lang="scss">
    @media (min-width: 992px) {
        .navbar-search-form-mobile,
        .nav-mobile-menu {
            display: none;
        }

    }

    @media screen and (min-width: 1024px) {
        .desktop-hidden {
            display:none !important;
        }
    }

    .logo-normal {
        display: inline-block !important;
        font-size: 22px !important;
        vertical-align: middle !important;
    }

    .logo-img {
        padding-top: 7px;
        vertical-align: middle !important;
        margin-left: 25px !important;
        display: inline-block;
    }

    .user-info {
        color: white;
    }

    .photo {
        border: none !important;
    }
    .languages {
        margin-left:5px;
        .sidebar-mini {
            margin-right:30px;
        }
    }

    .small {
        font-size:12px;
        opacity:0.7;
    }

</style>
