<template>
    <div class="wrapper">
        <div class="ad">
            <div class="ad__header">
                <div class="ad__title">{{ad.title}}</div>
                <div v-if="currentUser && ad.autor_name === currentUser.username" class="actions">
                    <div @click="openDialog()">
                        <img class="icon" src="../assets/rubbish-bin.svg" alt="">
                    </div>
                    <router-link :to="`/edit/${ad.id}`">
                        <img class="icon" src="../assets/pencil-edit-button.svg" alt="">
                    </router-link>
                </div>
            </div>

            <div class="ad__description">{{ad.description}}</div>
            <div class="ad__data">
                <div class="ad_autor">
                    <span>Autor: </span>
                    {{ad.autor_name}}
                </div>
                <div>
                    <span>Create: </span>{{ad.created_at | date}}
                </div>
            </div>


        </div>
        <div>
            <router-link class="link" to="/">Home</router-link>
        </div>

        <div v-if="dialog" @click="closeDialog($event)" ref="dialog"
             :class="dialogClasses()">
            <div class="dialog__block">
                <div class="card">
                    <div class="dialog__title">Are you sure?</div>
                    <div class="dialog__btns">
                        <div>
                            <router-link :to="`/delete/${ad.id}`">
                                Yes
                            </router-link>
                        </div>
                        <div @click="closeDialog()">No</div>
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>

<script>
  export default {
    name: 'Advertisement',
    data () {
      return {
        dialog: false,
        dialogEnter: false,
        dialogLeave: false
      }
    },
    computed: {
      ad () {
        return this.$store.state.ads.find(ad => ad.id == this.$route.params.id)
      },
      currentUser () {
        return this.$store.state.currentUser
      }
    },
    filters: {
      date (value) {
        if (!value) return value;
        let date = value.split('T')
        const [year, month, day] = date[0].split('-');
        return `${day}/${month}/${year}`
      },
    },
    methods: {
      dialogClasses() {
        return {
          dialog: true,
          enter: this.dialogEnter,
          leave: this.dialogLeave
        }
      },
      openDialog() {
        this.dialog = !this.dialog;
        this.dialogEnter = true;
        setTimeout(() => {
          this.dialogEnter = false;
        }, 100);
      },
      closeDialog (e) {
        if (e) {
          if (e.target === this.$refs.dialog) {
            this.dialogLeave = true;
            setTimeout(() => {
              this.dialog = !this.dialog;
              this.dialogLeave = false;
            }, 400);
          }
          return
        }
        this.dialogLeave = true;
        setTimeout(() => {
          this.dialog = !this.dialog;
          this.dialogLeave = false;
        }, 400);
      }
    }
  }
</script>

<style scoped lang="scss">
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .ad {
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        min-width: 280px;
        align-items: center;
        background: white;
        color: #212121;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 20px;
    }

    .ad__header {
        display: flex;
        width: 100%;
    }

    .ad__title {
        padding: 10px;
        text-transform: capitalize;
        font-size: 24px;
        width: 70%;
        display: flex;
        justify-content: center;
    }

    .ad__description {
        padding: 10px;
        font-size: 18px;
    }

    .ad__data {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }

    .actions {
        width: 20px;
        margin: 5px;
        display: flex;
    }

    .icon {
        width: 16px;
        cursor: pointer;
        margin: 5px;
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
    .ad_autor{
        margin-right: 20px;
    }
    .dialog {
        position: fixed;
        background: rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        cursor: auto;
    }

    .dialog__block {
        transition: .4s ease-in-out;
        width: 265px;
    }

    .enter > .dialog__block {
        transform: scale(0);
        opacity: 0;
    }

    .leave > .dialog__block {
        transform: scale(1.5);
        opacity: 0;
    }

    .card {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 260px;
        background: #212121;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }
    .dialog__title{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
    }
    .dialog__btns{
        display: flex;
        justify-content: space-between;
        div {
            border: 1px solid #212121;
            padding: 5px 10px;
            border-radius: 5px;
            outline: none;
            background: white;
            cursor: pointer;
            transition: .5s;
            color: #212121;
            a {
                text-decoration: none;
                color: #212121;
            }
            &:hover {
                box-shadow: 0.2px 0.2px 1px 1px lighten(#212121, 15%);
            }
        }
    }
</style>