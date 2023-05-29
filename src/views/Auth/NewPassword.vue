<template>
  <alert 
    :message ="status.message"
    :modalActive="modalActive"
    :isError="isError"
     @close="closeNotification" />
  <div class="new-password-container">
    <intellisenseTitle title="Reset Password" />
    <div class="menu">
      <Modal>
        <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" >
          <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
            <div class="field-wrapper">
              <BaseInput name="password" type="password" label="New Password" class="text-field" />
            </div>
            <div class="field-wrapper">
              <BaseInput name="password_confirmation" type="password" label="Repeat New Password" class="text-field" />
            </div>
            <div class="button-wrapper">
              <MyButton type="submit" class="filled" label="Send" :loading="isLoading"  />
            </div>
          </form>
        </VeeForm>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import popupContent from '@/components/popups/popupContent.vue'
import BaseInput from '@/components/input/BaseInput.vue'
import Modal from '@/components/modal/Modal.vue'
import MyButton from '@/components/button/BaseButton.vue'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import { newPasswordSchema } from '@/composable/validationSchemas'
import { useAuthStore } from '@/stores/AuthStore'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

    
  const schema = newPasswordSchema
  const isError = ref(false)
  const modalActive = ref(false)

  const authStore = useAuthStore()
  const { status, isLoading } = storeToRefs(useAuthStore())
  
  const route = useRoute()
  const email = route.params.email
  const signature = route.query.signature
  
  const onSubmit = async (values) => {
    await authStore.newPassword(values,email,signature)
    if (status.value.code == 'fail') {
    isError.value = true
    setTimeout(closeNotification, 3000)
    } else {
      isError.value = false
      setTimeout(closeNotification, 3000)
      resetForm()
    }
  }

  function closeNotification() {
    modalActive.value = false
  }
    

</script>

<style scoped>

.new-password-container {
  @apply flex flex-col
}

.header {
  @apply flex flex-col justify-center mt-10 h-fit w-full items-center gap-3
}
.menu {
  @apply flex flex-col w-full items-center justify-center
}

span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

.form-wrapper{
  @apply flex flex-col mb-4
}

.field-wrapper{
  @apply flex flex-col
}

.create-account {
  @apply flex flex-col items-center gap-3
}
.create-account router-link {
  @apply font-normal text-lg mt-5 text-center text-white cursor-pointer
}
.button-wrapper {
  @apply mt-3 w-full flex flex-col
}
h1 {
  @apply mb-8 font-bold text-2xl
}


</style>
