<template>
    <div>
        <div class="title">
            Access denied
        </div>
        <div class="submit">
            <router-link class="link" to="/">Home</router-link>
        </div>
    </div>

</template>
<script>
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('setAdId', to.params.id)
        if (vm.$store.state.currentUser &&
          vm.$store.state.currentUser.username === vm.$store.getters.getAd.autor_name) {
          let data = {user: vm.$store.state.currentUser.username, adId: to.params.id};
          vm.$store.commit('deleteAd', data);
          vm.$router.push('/');
        } else {
          this.$store.commit('setAdId', undefined)
          setTimeout(() => {
            vm.$router.push('/');
          }, 3000)
        }
      });
    },
    beforeRouteUpdate (to, from, next) {
      if (this.$store.state.currentUser &&
        this.$store.state.currentUser.username === this.$store.getters.getAd.autor_name) {
        let data = {user: this.$store.state.currentUser.username, adId: to.params.id};
        this.$store.commit('deleteAd', data);
        this.$router.push('/');
      } else {
        this.$store.commit('setAdId', undefined)
        setTimeout(() => {
          this.$router.push('/');
        }, 3000)
      }
      next()
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('setAdId', undefined)
      next()
    },
  };
</script>
<style lang="scss" scoped>
    .title {
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;
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
