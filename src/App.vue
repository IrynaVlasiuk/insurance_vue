<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">

    <notifications transition-name="notification-list" transition-mode="out-in"></notifications>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  // Loading some plugin css asynchronously
  import('sweetalert2/dist/sweetalert2.css')
  import('vue-notifyjs/themes/default.css')

  export default {
    name:'App',
    created() {
      this.$i18n.locale = this.$store.getters.userLocale;
    },
    computed: {
      i18n: function () {
        return this.$store.getters.userLocale;
      },
    },
    watch: {
      i18n: function() {
        this.$i18n.locale = this.$store.getters.userLocale;
      }
    }
  }

</script>

<style lang="scss">
  .notifications.vue-notifyjs {
    .notification-list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .notification-list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .notification-list-enter-active, .notification-list-leave-active {
      transition: opacity 0.4s;
    }
    .notification-list-enter, .notification-list-leave-to /* .list-leave-active for <2.1.8 */
    {
      opacity: 0;
    }
  }

  // AG Grid
  /*@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";*/
  /*@import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";*/

</style>
