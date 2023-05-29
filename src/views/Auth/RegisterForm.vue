<template>
  <alert 
    :message ="status.message"
    :modalActive="modalActive"
    :isError="isError"
     @close="closeNotification" />
  <div class="register-container">
    <intellisenseTitle title="Benvenuti nel nuovo portale di Idrobit" />
    <div class="menu">
      <Modal>
        <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" >
          <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
            <div class="input-field">
              <BaseInput name="firstName" type="firstName" label="Nome" class="text-field" />
            </div>
            <div class="input-field">
              <BaseInput name="lastName" type="lastName" label="Cognome" class="text-field" />
            </div>
            <div class="input-field">
              <BaseInput name="email" type="email" label="Email" class="text-field" />
            </div>
            <div class="input-field">
              <BaseInput name="password" type="password" label="Password" class="text-field" />
            </div>
            <div class="input-field">
              <BaseInput name="passwordConfirmation" type="password" label="Conferma password" class="text-field" />
            </div>
            <div class="button-wrapper">
              <MyButton type="submit" class="filled" label="Register" :loading="isLoading" />
            </div>
          </form>
        </VeeForm>
        <div class="create-account">
          <router-link :to="{name: 'LoginForm'}"> ALREADY HAVE AN ACCOUNT? </router-link>
        </div>
      </Modal>
    </div>
  </div>


</template>

<script setup>
  import BaseInput from '@/components/input/BaseInput.vue'
  import Modal from '@/components/modal/Modal.vue'
  import MyButton from '@/components/button/BaseButton.vue'
  import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
  import { useAuthStore } from '@/stores/AuthStore'
  import { registerSchema } from '@/composable/validationSchemas'
  import { defineAsyncComponent, ref } from 'vue'
  import { storeToRefs } from 'pinia'

  const ErrorPopup = defineAsyncComponent(
    () => import ('@/components/popups/popupContent.vue'),
  )
  const schema = registerSchema
  const modalActive = ref(false)
  const isError = ref(false)

  // auth with pinia
  const authStore = useAuthStore()
  const { status, isLoading } = storeToRefs(useAuthStore())

  const onSubmit = async (values, { resetForm }) => {
    const { email, password, passwordConfirmation,firstName, lastName } = values
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }
    await authStore.signUp(data)
    modalActive.value = true
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

.register-container {
  @apply flex flex-col
}

.header {
  @apply flex flex-col justify-center mt-10 h-fit w-full items-center gap-3
}
.header img {
  @apply w-52
}
.menu {
  @apply flex flex-col w-full items-center justify-center
}

span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

.form-wrapper{
  @apply flex flex-col  mb-4
}
.field-wrapper {
  @apply flex
}
.input-field{
  @apply flex flex-col h-20 w-full
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