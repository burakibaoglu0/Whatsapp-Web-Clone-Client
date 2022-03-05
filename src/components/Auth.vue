<template>
    <div class="main">
        <div class="login-container">
            <div class="info-container">
                <div class="info-content">
                    <div class="info-title">
                        WhatsApp'ı bilgisayarınızda kullanmak için:
                    </div>
                    <ol class="options">
                        <li>WhatsApp'ı telefonunuzda açın</li>
                        <li style="margin-top:18px;"><span style="font-weight:500; line-height:24px;">Menü <img
                                    src="@/assets/images/menü.png" alt="menu"></span> veya <span
                                style="font-weight:500; line-height:24px;">Ayarlar <img src="@/assets/images/ayarlar.png"
                                    alt="options"></span> seçeneğine dokunup <span
                                style="font-weight:500; line-height:24px;">Bağlı
                                Cihazlar'ı</span> seçin</li>
                        <li style="margin-top:18px;">Kodu taramak için telefonunuzu bu ekrana doğrultun</li>
                    </ol>
                </div>
                <div class="qr-placeholder">
                    <canvas width="264" height="264" id="canvas"></canvas>
                    <div class="save-session">
                        <div class="save-session-layout">
                            <input class="checkbox" type="checkbox" id="checkbox" v-model="saveSession">
                            <label class="label" for="checkbox">Oturumu açık tut</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import QRCode from "qrcode";
    export default {
        name: "Auth",
        data() {
            return {
                qrCode: null,
                saveSession: false,
            };
        },
        async mounted() {
            try {
                this.qrCode = `${this.$socket.on("GET_QR_CODE", this.GET_QR_CODE)}`;

            } catch (e) {
                console.log(e);
            }
        },
        methods: {
            GET_QR_CODE(data) {
                let canvas = document.getElementById('canvas')
                QRCode.toCanvas(
                    document.getElementById("canvas"),
                    data,
                    function (error) {
                        if (error) throw error;
                        console.log("success!");
                    }
                );
                canvas.style.width = '100%';
            }
        },
        computed: {
            issaveSession() {
                return this.saveSession
            }
        },
        watch: {
            issaveSession: {
                handler(sessionControl) {
                    this.$socket.emit("IS_SAVE_SESSION", sessionControl);
                }
            }
        }
    }
</script>
