<template>
  <div>
    <Navbar v-if="!loginStatus" />
    <template v-if="!loginStatus">
      <Auth />
    </template>
    <template v-else>
      <main-view></main-view>
    </template>
    <!-- <template v-else>
      <chat-page></chat-page>
    </template> -->
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue"
  import Auth from "@/components/Auth.vue"
  import MainView from "@/components/MainView.vue"
  //import ChatPage from "@/components/ChatPage.vue"

  export default {
    name: "Home",
    components: {
      Navbar,
      Auth,
      MainView,
     // ChatPage
    },
    data() {
      return {
        loginStatus: false,
      };
    },
    async mounted() {
      try {

        this.$socket.on("GET_LOGIN_STATUS", (data) => {
          this.loginStatus = data;
        });

      } catch (e) {
        console.log(e);
      }
    },
  }
</script>

<style lang="scss">
  @import "@/assets/styles/general_classes";
  @import "@/assets/styles/colors";

  .main {
    @include d-flex-column-centered;
    padding: 2% 24%;

    .login-container {
      width: 100%;
      min-height: 900px;
      background-color: #fff;
      @include d-flex-column-item-centered;
      flex-wrap: wrap;
      padding: 60px;
      border-radius: 3px;
      @include box-shadow(0px, 0px, 15px, -1px, var(--box-shadow));
      z-index: 2;

      .contacts {
        @include d-flex;
        width: 90%;
        margin-top: 100px;

        ul {
          flex: 100%;

          li {
            margin-bottom: 10px;
            @include d-flex-row;
            list-style: none;

            .contact-info {
              @include d-flex-column;
              padding: 10px;
            }

            &::hover {
              background-color: rgb(250, 250, 250);
              cursor: pointer;
              border-radius: 150px;
            }
          }
        }
      }

      .info-container {
        width: 100%;
        @include d-flex;
        flex-wrap: wrap;

        .qr-placeholder {

          .save-session {
            @include d-flex-row-centered;
            flex-wrap: nowrap;
            width: 100%;

            .save-session-layout {

              .checkbox {
                margin: 0px 6px 0px 0px;
              }

              .label {
                font-size: 14px;
                color: rgba(var(--black-rgb), .45);
              }
            }
          }

        }

        .info-content {
          @include d-flex-column;
          flex: 50%;
          flex-wrap: wrap;

          .info-title {
            font-size: 28px;
            font-weight: 300;
            margin-bottom: 52px;
            color: #525252;
          }

          .options {
            padding: 0px 0px 0px 24px;

            li {
              font-size: 18px;
              line-height: 28px;
              color: #4a4a4a;
            }
          }
        }
      }
    }

    &::before {
      position: absolute;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 222px;
      content: "";
      background: #00bfa5;
    }
  }

  @media screen and (max-width:1030px) {
    .main {
      padding: 2% 9%;
    }
  }

  @media screen and (max-width:832px) {
    .main {
      padding: 2% 8%;
    }
  }

  @media screen and (max-width:686px) {
    .main {
      padding: 0px 0px;
    }
  }
</style>