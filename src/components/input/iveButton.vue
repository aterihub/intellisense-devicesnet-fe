<template>
  <button v-bind="$attrs" :disabled="loading || disable" :class="{'button--loading' : loading}">
    <span class="button__text">{{label}}</span> 
  </button>
</template>

<script>
export default {
  props: [
    'disable',
    'loading',
    'label'
  ]
}
</script>

<style scoped>

button {
  @apply 
    flex h-full w-full cursor-pointer justify-center items-center text-center
    bg-[#1363df] rounded-md text-white 
    text-[10px] sm:text-sm sm:font-medium px-2
    transition-all duration-300
}

/* .filled__blue {
  @apply bg-[#1363df] rounded-md text-white cursor-pointer text-sm font-medium justify-center items-center text-center
  transition-colors duration-300 border-solid border-2 border-[#1363df]
}
*/

.input:hover {
  @apply bg-[#1363df]/70 
} 


</style>