<template>
  <div class="header">
    <img src="@/assets/img/intellisense-logo.png" id="logo">
    <span>
      <h1 class="title">{{title}}</h1>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props:['title']
}
</script>

<style scoped>
.header {
  @apply 
  relative
    flex flex-col justify-center h-fit w-full items-center 
    gap-[10px] mt-[80px] mb-[120px] md:mb-[80px]
    /* gap-[10px] mt-[10px] mb-[16px] md:mt-[120px] md:mb-[80px] */
}
.header img {
  @apply 
  w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[360px] 2xl:w-[400px]
  transition-all ease-in-out duration-300

}
.title {
  @apply 
  relative flex h-full
    font-semibold
    text-xs sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[30px] 2xl:text-[36px]
    transition-all ease-in-out duration-300
}
</style>