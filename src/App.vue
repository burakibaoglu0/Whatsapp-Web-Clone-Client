<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss">

@import "@/assets/styles/general_classes";
@import "@/assets/styles/colors";

* {
  @include all;
}

body {
  background-color: var(--body);
}

::-webkit-scrollbar{
    width: 6px!important;
    height: 6px!important;
}

::-webkit-scrollbar-thumb{
  background-color: rgba(var(--black-rgb),.2);
}
</style>
