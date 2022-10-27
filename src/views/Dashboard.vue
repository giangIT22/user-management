<template>
    <div class="list-user">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <button style="float:right; font-size:18px; margin-bottom:10px" 
                    class="btn btn-primary" @click="redirectView()">Thêm mới</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Địa Chỉ</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <th scope="row">{{ user.id }}</th>
                                <td>{{ user.name }}</td>
                                <td>{{ user.mail_address }}</td>
                                <td>{{ user.address }}</td>
                                <td>{{ user.phone }}</td>
                                <td>
                                    <button type="button" class="btn btn-outline-primary" @click="$router.push({name: 'UpdateUser', params:{id: user.id}})">Sửa</button>
                                    <button type="button" class="btn btn-outline-primary" 
                                        @click="deleteData(user.id)">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <nav aria-label="...">
                        <ul class="pagination">
                            <li class="page-item" v-if="currentPage > 1">
                                <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
                            </li>

                            <li class="page-item" v-for="page in totalPage" :key="page.id" :class="{active : page == currentPage}">
                                <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                            </li>

                            <li class="page-item" v-if="currentPage < totalPage">
                                <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
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
                users: [],
                currentPage: 1,
                perPage: 1,
                totalPage: 0,
                isLoading: false,
                fullPage: true,
            }
        },
         components: {
            Loading
        },
        created() {
            this.getData();
        },
        watch: {
            currentPage() {
                this.getData();
            }
        },
        methods: {
            getData: async function () {
                this.isLoading = true;
                const response = await axios.get('http://localhost:8089/api/users?page=' + this.currentPage);
                this.users = response.data.data.users;
                this.totalPage = response.data.data.meta.last_page;
                this.perPage = response.data.data.meta.per_page;
                this.isLoading = false;                    
            },
            deleteData(id) {
                if (confirm('Bạn có muốn xóa không')) {
                    axios.delete('http://localhost:8089/api/users/' + id)
                    .then((response) => {
                        this.getData()
                    })
                }
            },
            redirectView() {
                this.$router.push({name: 'CreateUser'});
            }
        },
    }
</script>

<style scoped>
    .list-user {
        margin: 60px 0;
    }

    .btn {
        font-size: 12px;
        margin: 0 5px;
        outline: none;
    }
    
</style>