<template>
    <section class="claim-details-validation-buttons">

        <button type="submit" class="btn btn-fill btn-warning"
                @click="validateByRole('manager')"
                v-if="(isClaimManager || isAdmin) && (status('to_validate_manager')) && (!status('cancelled'))">
            <i class="ti-check"></i>{{$t('labels.validate_manager')}}
        </button>

        <button type="submit" class="btn btn-fill btn-warning"
                @click="validateByRole('chief')"
                v-if="(isClaimChief || isAdmin) && (status('to_validate_chief')) && (!status('cancelled'))">
            <i class="ti-check"></i>{{$t('labels.validate_chief')}}
        </button>

        <button type="submit" class="btn btn-fill btn-warning"
                @click="validateByRole('area-manager')"
                v-if="(isAreaManager || isAdmin) && (status('to_validate_area_manager')) && (!status('cancelled'))">
            <i class="ti-check"></i>{{$t('labels.validate_area_manager')}}
        </button>

        <button type="submit" class="btn btn-fill btn-success"
                @click="setStatus('received')"
                v-if="roleAndStatus('backoffice', 'validated_by_area_manager') && !status('received')  && (!status('cancelled'))">
            <i class="ti-check"></i>{{$t('labels.validation.received')}}
        </button>

        <button type="submit" class="btn btn-fill btn-success"
                @click="setStatus('validated')"
                v-if="roleAndStatus('backoffice', 'received') && !status('validated') && (!status('cancelled'))">
            <i class="ti-check"></i>{{$t('labels.validation.validated')}}
        </button>

        <button type="submit" class="btn btn-fill btn-success"
                @click="setStatus('closed')"
                v-if="roleAndStatus('backoffice', 'validated') && !status('closed') && (!status('cancelled'))">
            <i class="ti-check"></i>{{$t('labels.validation.closed')}}
        </button>

        <div class="pull-right">
            <button type="submit" class="btn btn-fill btn-danger"
                    @click="setStatus('cancelled')"
                    v-if="$store.getters.isAuthAdmin && !status('cancelled')">
                <i class="ti-close"></i>{{$t('labels.validation.cancel')}}
            </button>
            <button type="submit" class="btn btn-fill btn-danger"
                    @click="setStatus('waivered')"
                    v-if="$store.getters.isAuthAdmin && !status('waivered')">
                <i class="ti-close"></i>{{$t('labels.validation.waiver')}}
            </button>
        </div>
    </section>
</template>

<script>

  import ClaimResource from '../../../../../../api/resources/ClaimResource'
  import {EventBus} from '../../../../../../bootstrap/event-bus'

  export default {
    name: 'ClaimDetailsValidationButtons',
    computed: {
      claim: function () {
        return this.$parent.claim
      },
      user: function () {
        return this.$store.getters.currentUser
      },
      role: function () {
        return this.$store.getters.userRole
      },
      isClaimChief: function () {
        return this.$store.getters.currentUser.id === this.claim.chief_assessor_id
      },
      isClaimManager: function () {
        return this.$store.getters.currentUser.id === this.claim.manager_assessor_id
      },
      isAreaManager: function () {
        return this.$store.getters.currentUser.id === this.claim.area.area_manager_id
      },
      isAdmin: function () {
        return this.$store.getters.isAuthAdmin
      }
    },
    methods: {
      roleAndStatus ($role, $status) {
        return (this.role === $role && this.claim.status.name === $status)
      },
      status ($status) {
        return $status === this.claim.status.name
      },
      validateByRole ($role) {
        ClaimResource.validateByRole(this.claim.id, $role).then(res => {
          this.$parent.fetchClaim();
          this.validationSuccessNotification();
        })
      },
      setStatus ($status) {
        ClaimResource.setClaimStatus(this.claim.id, $status).then(res => {
          this.$parent.fetchClaim();
          this.statusUpdateNotification();
        })
      },
      validationSuccessNotification() {
        EventBus.$emit('notification-popup', {text: 'Claim successfully validated', status: 'success'})
      },
      statusUpdateNotification() {
        EventBus.$emit('notification-popup', {text: 'Claim status updated', status: 'success'})
      }
    },
  }
</script>
