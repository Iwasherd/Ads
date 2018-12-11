<template>
    <div class="home">
        <div class="title">Advertisements</div>
        <div class="header">
            <div v-if="!currentUser">
                <form @submit.prevent="login()" class="form-1">
                    <div class="field">
                        <input v-model="user.username" required type="text" name="login" placeholder="Your login">
                    </div>
                    <div class="field">
                        <input v-model="user.password" required type="password" name="password"
                               placeholder="Password">
                        <div v-if="invalidPass">
                            <span class="err--text">{{invalidPass}}</span>
                        </div>
                    </div>
                    <div class="submit">
                        <button type="submit" name="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div class="userdata container" v-if="currentUser">
                <span class="username">{{currentUser.username}}</span>
                <a class="button" @click.prevent="logout" href="/logout">logout</a>
            </div>
        </div>

        <div class="main">
            <div class="container">
                <div v-if="currentUser" class="main__btn">
                    <router-link class="button white" to="/edit">Create Ad</router-link>
                </div>
                <div class="ads">
                    <transition-group name="list-ads" tag="div" mode="out-in">
                        <app-ad v-for="(ad,i) in visibleObj" :key="i" :ad="ad"></app-ad>
                    </transition-group>

                </div>
                <pagination
                        :currentPage='currentPage'
                        @page:update='updatePage'
                        :pageSize='pageSize'
                        :visibleObj='visibleObj'
                        :ads='allAds'/>
            </div>
        </div>
    </div>
</template>

<script>
  import AppAd from '@/components/Ad.vue'
  import Pagination from '@/components/Pagination.vue'

  export default {
    name: 'home',
    components: {
      AppAd,
      Pagination
    },
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        invalidPass: '',
        allAds: [],
        pageSize: 5,
        currentPage: 0,
        visibleObj: [],
      }
    },
    watch: {
      allAds () {
        this.updateVisibleObj()
      }
    },
    computed: {
      currentUser () {
        return this.$store.state.currentUser
      },
      passwordErr () {
        return this.$store.state.passwordErr
      },
      ads () {
        return this.$store.getters.getAds
      }
    },
    created () {
      this.getAds()
    },
    methods: {
      login () {
        if (this.user.username && this.user.password) {
          this.$store.dispatch('AUTH_REQUEST', this.user)
            .then(() => {
              if (this.passwordErr) {
                this.user.password = ''
                this.invalidPass = 'invalid password'
                return
              }
              this.user = {}
              this.$router.push('/')
              this.invalidPass = ''
            })
        }
      },
      logout () {
        this.$store.dispatch('AUTH_LOGOUT')
          .then(() => {
            this.$router.push('/')
          })
      },
      getAds () {
        this.allAds = [...this.ads]
      },
      updatePage (pagenumber) {
        this.currentPage = pagenumber
        this.updateVisibleObj()
      },
      updateVisibleObj () {
        this.visibleObj = this.allAds.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
        if (this.visibleObj.length === 0 && this.currentPage > 0) {
          this.updatePage(this.currentPage - 1)
        }
      },
    }
  }
</script>
<style lang="scss">
    .container {
        max-width: 1200px;
        padding: 10px;
    }

    .list-ads-enter-active, .list-ads-leave-active {
        transition: all .5s;
    }

    .list-ads-enter, .list-ads-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;
    }

    .header {
        background: white;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-1 {
        display: flex;
        flex-direction: row;
    }

    .field {
        margin: 10px;
        input {
            border: 1px solid #212121;
            border-radius: 5px;
            outline: none;
            padding: 5px;
        }

    }

    .submit {
        margin: 10px;
        button {
            border: 1px solid #212121;
            padding: 5px 10px;
            border-radius: 5px;
            outline: none;
            background: white;
            cursor: pointer;
            transition: .5s;
        }
        &:hover {
            button {
                box-shadow: 0.2px 0.2px 1px 1px lighten(#212121, 15%);
            }
        }
    }

    .err--text {
        color: red;
    }

    .userdata {
        flex: 1 1 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .username {
        font-size: 18px;
        color: #212121;
    }

    .button {
        padding: 5px 10px;
        border: 1px solid #212121;
        border-radius: 5px;
        outline: none;
        background: white;
        cursor: pointer;
        transition: .5s;
        text-decoration: none;
        color: #212121;
        text-transform: capitalize;
        &:hover {
            box-shadow: 0.2px 0.2px 1px 1px lighten(#212121, 15%);
        }
        & + .white:hover {
            box-shadow: 0.2px 0.2px 1px 1px #ffffff;
        }
    }

    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    .main__btn {
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ads {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
</style>
