<template>
    <nav class="navbar navbar-default" :style="{ 'background-color': $store.getters.INSTANCE_NAVBAR_COLOR}">
        <div class="container-fluid">
            <div class="navbar-minimize">
                <button class="btn btn-fill btn-icon" @click="minimizeSidebar">
                    <i :class="$sidebar.isMinimized ? 'ti-menu-alt' : 'ti-more-alt'"></i>
                </button>
            </div>
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}"
                        @click="toggleSidebar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar bar1"></span>
                    <span class="icon-bar bar2"></span>
                    <span class="icon-bar bar3"></span>
                </button>
                <a class="navbar-brand">{{$t(this.$route.name)}}</a>
            </div>
            <div class="collapse navbar-collapse">
                <!--<form class="navbar-form navbar-left navbar-search-form" role="search">-->
                <!--<div class="input-group">-->
                <!--<input type="text" value="" class="form-control" placeholder="Search...">-->
                <!--<span class="input-group-addon"><i class="fa fa-search"></i></span>-->
                <!--</div>-->
                <!--</form>-->
                <ul class="nav navbar-nav navbar-right">
                    <!--<li class="open">-->
                    <!--<router-link to="/admin/stats" class="dropdown-toggle btn-magnify" data-toggle="dropdown">-->
                    <!--<i class="ti-panel"></i>-->
                    <!--<p>Stats</p>-->
                    <!--</router-link>-->
                    <!--</li>-->
                    <drop-down tag="li" :title="$t('labels.languages')" icon="ti-world">
                        <li @click="setLanguage('en')"><a href="#">{{$t('labels.language_english')}}</a></li>
                        <li @click="setLanguage('fr')"><a href="#">{{$t('labels.language_french')}}</a></li>
                    </drop-down>

                    <li class="open" @click="userLogout()">
                        <router-link to="#" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
                            <i class="ti-direction"></i>
                            <p>{{$t('labels.logout')}}</p>
                        </router-link>
                    </li>

                    <!--<li>-->
                    <!--<router-link to="/admin/overview" class="btn-rotate">-->
                    <!--<i class="ti-settings"></i>-->
                    <!--</router-link>-->
                    <!--</li>-->
                </ul>

            </div>
        </div>
    </nav>
</template>
<script>
  export default {
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      minimizeSidebar () {
        this.$sidebar.toggleMinimize()
      },
      setLanguage: function (lang) {
        this.$store.dispatch('setUserLocale',lang).then(res => {
          this.$i18n.locale = lang;
        })
      },
      userLogout: function () {
        this.$store.dispatch('logout').then(res => {
          this.$router.push('/login')
        })
      }
    }
  }

</script>
<style>

    .local {
        background: rgba(255, 199, 74, 0.1);
    }
    .dev {
        background: rgba(4, 108, 143, 0.1);
    }
    .test {
        background: rgba(0, 192, 48, 0.1);
    }

</style>
