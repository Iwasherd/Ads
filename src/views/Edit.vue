<template>
    <div>
        <div v-if="!isEmpty()">
            <div class="title">{{currentAd ? 'Edit ad' : 'Create ad'}}</div>
            <form>
                <form @submit.prevent="submit" class="form-1">
                    <div class="field">
                        <label for="title">Title</label>
                        <input id="title" v-model="ad.title" required type="text">
                    </div>
                    <div class="field">
                        <label for="description">Description</label>
                        <textarea id="description"
                                  ref="textarea"
                                  @input="autoresize()"
                                  v-model="ad.description"
                                  required>
                    </textarea>
                    </div>
                    <div v-if="currentUser">Autor: {{currentUser.username}}</div>
                    <div class="submit">
                        <button type="submit" name="submit">{{currentAd ? 'Update' : 'Create'}}</button>
                    </div>
                </form>
            </form>
        </div>
        <div class="title" v-else>Access denied</div>
        <div class="submit">
            <router-link class="link" to="/">Home</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.$store.state.currentUser) {
          vm.$router.push('/')
        }
        if (to.params.id) {
          vm.$store.commit('setAdId', to.params.id)
          vm.ad = {}
          if (vm.$store.getters.getAd.autor_name &&
            vm.$store.getters.getAd.autor_name === vm.$store.state.currentUser.username) {
            vm.ad = {...vm.$store.getters.getAd}
          }
        } else {
          vm.$store.commit('setAdId', undefined)
          vm.ad = {
            title: '',
            id: '',
            description: '',
            created_at: ''
          }
        }
      })
    },
    beforeRouteUpdate (to, from, next) {
      if (!this.$store.state.currentUser) {
        this.$router.push('/')
      }
      if (to.params.id) {
        this.$store.commit('setAdId', to.params.id)
        this.ad = {}
        if (this.$store.getters.getAd &&
          this.$store.getters.getAd.autor_name === this.$store.state.currentUser.username) {
          this.ad = {...this.$store.getters.getAd}
        }
      } else {
        this.$store.commit('setAdId', undefined)
        this.ad = {
          title: '',
          id: '',
          description: '',
          created_at: ''
        }
      }
      next()
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('setAdId', undefined)
      this.ad = {}
      next()
    },
    name: 'Edit',
    data () {
      return {
        ad: {}
      }
    },
    computed: {
      currentUser () {
        return this.$store.state.currentUser
      },
      ads () {
        return this.$store.state.ads
      },
      currentAd () {
        return this.$store.getters.getAd
      }
    },
    watch: {
      ad () {
        this.$nextTick(() => {
          this.autoresize()
        })
      }
    },
    methods: {
      autoresize () {
        const textarea = this.$refs.textarea;
        if (textarea) {
          textarea.style.height = 0;
          const height = this.$refs.textarea.scrollHeight;
          const minHeight = parseInt('2', 3) * parseFloat('13');
          textarea.style.height = Math.max(minHeight, height) + 'px'
        }
      },
      submit () {
        if (this.currentAd) {
          this.updateAd()
        } else {
          this.createAd()
        }
      },
      createAd () {
        this.ad.created_at = new Date().toISOString()

        // calculate new id
        let collectionOfId = []
        this.ads.map(ad => collectionOfId.push(ad.id))
        this.ad.id = Math.max.apply(null, collectionOfId) + 1

        this.ad.autor_name = this.currentUser.username

        this.$store.commit('addAd', this.ad)
        this.$router.push(`/${this.ad.id}`)

      },
      updateAd () {
        this.$store.dispatch('updateAd', this.ad)
          .then(() => {
            this.$router.push(`/${this.ad.id}`)
          })
      },
      isEmpty () {
        return Object.keys(this.ad).length === 0
      }
    }
  }
</script>

<style scoped lang="scss">
    .title {
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;
    }

    .form-1 {
        display: flex;
        flex-direction: column;
        margin: 20px;
    }

    .field {
        margin: 10px;
        display: flex;
        flex-direction: column;
        width: 300px;
        input {
            border: 1px solid #212121;
            border-radius: 5px;
            outline: none;
            padding: 5px;
        }
        textarea {
            border: 1px solid #212121;
            border-radius: 5px;
            outline: none;
            padding: 5px;
            resize: none;
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

    .link {
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
    }
</style>