<template>
    <div class="chat-page-container">
        <div class="chat-main">
            <div class="right-side">
                <div class="menu-header">
                    <div class="user-profile">
                        <img style="border:1px solid #ddd; border-radius:40px; margin-right:10px; cursor:pointer;"
                            :src="profilePictureURL" width="38" height="38" alt="profile-picture">
                    </div>
                    <div class="header-options">
                        <div>
                            <img class="icons" src="@/assets/images/status.png" alt="status">
                        </div>
                        <div>
                            <img class="icons" src="@/assets/images/new-message.png" alt="new-message">
                        </div>
                        <div>
                            <img class="icons" src="@/assets/images/settings.png" alt="settings">
                        </div>
                    </div>
                </div>
                <div class="search-area"></div>
                <div class="chats-area"></div>
            </div>
            <div class="left-side">
                <link-creator></link-creator>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getPictureURL
    } from "@/api/axios"

    import LinkCreator from "@/components/LinkCreator"

    export default {
        name: "ChatPage",
        data() {
            return {
                profilePictureURL: null,
                userName: null,
                userNumber: null,
                contacts: [],
            };
        },
        components: {
            LinkCreator
        },
        async mounted() {
            try {
                this.$socket.on("GET_PROFILE_PICTURE_URL", (data) => {
                    this.profilePictureURL = data;
                })

                this.$socket.on("GET_USER_NAME", (data) => {
                    this.userName = data;
                })

                this.$socket.on("GET_USER_NUMBER", (data) => {
                    this.userNumber = data;
                })
                this.$socket.on("GET_CONTACTS", async (data) => {
                    let contact = {
                        name: null,
                        pushname: null,
                        number: null,
                        profilePicUrl: null
                    };
                    for await (let element of data) {
                        if (element.isMyContact) {
                            contact['name'] = element.name
                            contact['pushname'] = element.pushname
                            contact['number'] = element.number
                            let _req = {
                                data: element.id._serialized
                            }
                            let url_res = await getPictureURL(_req).catch(e => console.log(e));
                            if (!url_res) continue;
                            const pic_url = url_res.data;
                            if (pic_url === '') {
                                contact['profilePicUrl'] =
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            } else {
                                contact['profilePicUrl'] = pic_url
                            }
                            const _contact = {
                                ...contact
                            }
                            this.contacts.push(_contact);
                        }
                    }
                })
            } catch (e) {
                console.log(e);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/styles/colors";
    @import "@/assets/styles/general_classes";

    .chat-page-container {
        @include d-flex-column-centered;
        padding: 1% 14%;

        .chat-main {
            @include d-flex-row;
            background-color: var(--white);
            width: 100%;
            min-height: 940px;
            height: 100%;
            @include box-shadow(0px, 0px, 15px, -1px, var(--box-shadow));

            .right-side {
                @include d-flex-column;
                flex: 25%;
                border-right: 1px solid #EDEDED;

                .menu-header {
                    background: #EDEDED;
                    @include d-flex-row-item-centered;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    padding: 3% 5%;
                    flex: 5%;

                    .user-profile {
                        @include d-flex-row;
                        flex: 60%;
                    }

                    .header-options {
                        @include d-flex-row;
                        justify-content: space-between;
                        flex: 40%;

                        .icons {
                            cursor: pointer;
                        }
                    }
                }

                .search-area {
                    background-color: #F6F6F6;
                    flex: 5%;
                }

                .chats-area {
                    background: var(--white);
                    flex: 90%;
                }
            }

            .left-side {
                flex: 75%;
                @include d-flex-column;
                padding: 5px;
                flex-wrap: wrap;
            }
        }

        &::before {
            position: absolute;
            top: 0;
            z-index: -1;
            width: 100%;
            height: 127px;
            content: "";
            background: #009688;
        }
    }
</style>