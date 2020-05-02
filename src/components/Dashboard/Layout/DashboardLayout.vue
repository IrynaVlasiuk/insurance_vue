<template>
    <div class="wrapper">

        <side-bar type="sidebar" :sidebar-links="$sidebar.sidebarLinks">

            <user-menu></user-menu>

            <mobile-menu></mobile-menu>

        </side-bar>

        <div class="main-panel">

            <top-navbar></top-navbar>

            <dashboard-content @click.native="toggleSidebar">

            </dashboard-content>

            <content-footer></content-footer>

        </div>

    </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import UserMenu from 'src/components/UIComponents/SidebarPlugin/UserMenu.vue'
  import MobileMenu from 'src/components/UIComponents/SidebarPlugin/MobileMenu.vue'
  import {EventBus} from '../../../bootstrap/event-bus'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      UserMenu,
      MobileMenu
    },
    created () {
      /** Notification event tracking **/
      let vm = this

      EventBus.$on('notification-popup', data => {
        vm.notify(data)
      })

      let channel = this.$pusher.subscribe('user-'+ this.$store.getters.currentUser.id)

      channel.bind('notification', function (res) {
        vm.notify({
          text: res.recipient + ' (' + res.role + ')',
          status: res.status,
          header: res.header
        })
      })
    },
    ready () {

    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      /**
       * Notify
       * @param data
       */
      notify: function (data) {
        let icons = {
          'success': 'ti-check',
          'warning': 'ti-alert',
          'danger': 'ti-alert'
        }

        let template = `<span> <b>` + data.header + `</b> <br> ` + data.text + `</span>`

        if (!data.header) {
          template = `<span>` + data.text + `</span>`
        }

        this.$notify(
          {
            component: {
              template: template
            },
            icon: icons[data.status],
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: data.status,
            timeout: data.timeout
          })
      }
    }
  }

</script>
