<template>
    <div class="row">
        <div class="col-lg-8 col-md-7">
            <edit-profile-form v-if="user">

            </edit-profile-form>
        </div>
    </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'

  export default {
    name: 'UserCreatePage',
    components: {
      EditProfileForm,
    },
    data: function () {
      return {
        user: {
          name: '',
          scope_id: '',
          area_id: '',
          type_id: '',
          login: '',
          email: '',
          passwd: '',
          firstname: '',
          lastname: '',
          address1: '',
          address2: '',
          city: '',
          zipcode: '',
        }
      }
    },
    created () {

    },
    methods: {

    }
  }

</script>
<style>

</style>
