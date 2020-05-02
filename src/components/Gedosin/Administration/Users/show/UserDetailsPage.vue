<template>
    <div class="row">
        <div class="col-lg-4 col-md-5">
            <user-card v-if="user">

            </user-card>
        </div>
        <div class="col-lg-8 col-md-7">
            <edit-profile-form v-if="user">

            </edit-profile-form>
        </div>
    </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
  import UserResource from '../../../../../api/resources/UserResource'

  export default {
    name: 'UserDetailsPage',
    components: {
      EditProfileForm,
      UserCard,
    },
    data: function () {
      return {
        user: null
      }
    },
    created () {
      this.fetchUserData()
    },
    methods: {
      fetchUserData: function () {
        UserResource.getUser(this.$route.params.user_id).then(res => {
          this.user = res.data
        })
      }
    }
  }

</script>
<style>

</style>
