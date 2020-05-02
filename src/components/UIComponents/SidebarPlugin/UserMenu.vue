<template>
  <div class="user">
    <div class="photo">
      <img src="/static/img/faces/face-2.jpg"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" @click="toggleMenu" href="javascript:void(0)">
           <span>
             {{ userName }} &nbsp {{ userLastName }}
             <b class="caret"></b>
          </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <el-collapse-transition>
          <ul class="nav" v-show="!isClosed">
            <li>
              <a href="javascript:void(0)">
                <span class="sidebar-mini">Mp</span>
                <span class="sidebar-normal">My Profile</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click.prevent="logout">
                <span class="sidebar-mini">L</span>
                <span class="sidebar-normal">Logout</span>
              </a>
            </li>
          </ul>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import AuthResource from '../../../api/resources/AuthResource'
  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    data () {
      return {
        isClosed: true,
        userName: '',
        userLastName: ''
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      },
      logout() {
        this.$store.commit('logout');
        this.$router.push('/login');
      }
    },
    computed: {
      currentUser() {
        // console.log(this.$store.getters);
        return this.$store.getters.currentUser
      }
    },
    created() {
      // Load values to assign to drop-down
      AuthResource.me().then((response) => {
          // console.log(response.data.data);
          this.userName = response.data.data.firstname;
          this.userLastName = response.data.data.lastname;
        })
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
