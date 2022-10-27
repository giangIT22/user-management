<template>
     <div class="update-user">
         <h1 style="text-align:center;">Cập nhật thông tin</h1>
        <div class="container">
            <div class="row">
                <form style="width:900px;margin:30px auto;" @submit.prevent="updateUser($route.params.id)">        
                    <div class="form-group">
                        <label >Name</label>
                        <input type="text" class="form-control" name="name" v-model="user.name">
                        <span class="message" v-if="errors.name">{{ errors.name[0] }}</span>
                    </div>
        
                    <div class="form-group">
                        <label >Email</label>
                        <input type="text" class="form-control" name="mail_address" v-model="user.mail_address">
                        <span class="message" v-if="errors.mail_address">{{ errors.mail_address[0] }}</span>
                    </div>

                    <div class="form-group">
                        <label >Password</label>
                        <input type="password" class="form-control" name="password" v-model="user.password">
                        <span class="message" v-if="errors.password">{{ errors.password[0] }}</span>
                    </div>

                    <div class="form-group">
                        <label >Password Confirmation</label>
                        <input type="password" class="form-control" name="password_confirmation" v-model="user.password_confirmation">
                        <span class="message" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</span>
                    </div>

                    <div class="form-group">
                        <label >Address</label>
                        <input type="text" class="form-control" name="address" v-model="user.address">
                        <span class="message" v-if="errors.address">{{ errors.address[0] }}</span>
                    </div>

                    <div class="form-group">
                        <label >Phone</label>
                        <input type="text" class="form-control" name="phone" v-model="user.phone">
                        <span class="message" v-if="errors.phone">{{ errors.phone[0] }}</span>
                    </div>
        
                    <button type="submit" class="btn btn-primary">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading"></span>
                        Cập nhật
                    </button>
                </form>
            </div>
        </div>
    </div>
     <!-- loading -->
        <loading v-model:active="isLoading"
                 :is-full-page="fullPage"/>
    <!-- loading -->
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    const axios = require('axios');
    
    export default {
        data() {
            return {
                user: {},
                errors: {},
                loading: false,
                isLoading: false,
                fullPage: true,
                errors:{}
            }
        },
        components: {
            Loading
        },
        created() {
            this.showUserById(this.$route.params.id)
        },
        methods: {
            showUserById: async function(id) {
                this.isLoading = true
                const response = await axios.get('http://localhost:8089/api/users/' + id)
                this.user = response.data.data;
                this.isLoading = false;
            },
            updateUser: async function(id) {
                this.loading = true;
                try {
                    await axios.put('http://localhost:8089/api/users/' + id, this.user);                
                    this.loading = false;
                    alert('Cập nhật thông tin người dùng thành công');
                    this.$router.push({name: 'Dashboard'});
                } catch(errors) {
                    this.errors = errors.response.data.errors;
                }
            }
        },

}
</script>

<style scoped>
    .form-group {
        margin: 20px 0;
    }

    button {
        margin: 20px 0 0 0;
    }

    .message {
        color: red;
    }
</style>