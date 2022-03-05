<template>
    <div class="main">
        <div class="login-container">
            <div class="info-container">
                <img style="border:1px solid #ddd; border-radius:150px; margin-right:10px;" :src="profilePictureURL"
                    width="150" height="150" alt="profile-picture">
                <div class="info-content" style="padding:10px;">
                    <p style="margin-bottom:20px; line-height:24px; font-size:18px;">{{userName}}</p>
                    <p style="margin-bottom:20px; line-height:24px; font-size:18px;">+{{userNumber}}</p>
                </div>
            </div>
            <div class="contacts">
                <ul>
                    <li v-for="contact in contacts" :key="contact.name">
                        <img :src="contact.profilePicUrl" :alt="contact.name || contact.pushname"
                            style="border:1px solid #ddd; border-radius:100px;" width="100" height="100">
                        <div class="contact-info">
                            <div v-if="contact.name" style="margin-bottom:5px;">{{contact.name}}</div>
                            <div v-else>{{contact.pushname}}</div>
                            <div>+{{contact.number}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {getPictureURL} from "@/api/axios"
    export default {
        name: "MainView",
        data() {
            return {
                profilePictureURL: null,
                userName: null,
                userNumber: null,
                contacts: []
            };
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

<style>

</style>