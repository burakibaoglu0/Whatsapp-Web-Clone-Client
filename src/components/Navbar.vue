<template>
  <div class="navbar">
    <div>
     <img src="@/assets/images/logo.png" alt="WhatsApp">
      <span style="margin-left:14px;">WhatsApp Web</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"Navbar"
};
</script>

<style lang="scss">

@import "@/assets/styles/colors";
@import "@/assets/styles/general_classes";

.navbar {
  width: 100%;
  padding: 1% 23%;
  background-color: var(--navbar);
  @include d-flex-column-centered;

  div {
    @include d-flex-row-item-centered;
    width: 100%;
  }

  span {
    color: white;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
  }
}
</style>
