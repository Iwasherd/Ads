import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    currentUser: undefined,
    passwordErr: false,
    ads: [{
        id: 0,
        title: 'Hello, Cummings Byers!',
        description: 'Aliqua occaecat do cillum cupidatat fugiat irure dolor adipisicing aliqua excepteur do irure. In aliquip qui occaecat exercitation fugiat ea exercitation minim mollit id deserunt Lorem magna. Nulla reprehenderit velit fugiat officia dolor quis amet esse aliquip eu deserunt dolore velit.',
        created_at: '2014-12-29T01:49:51Z',
        autor_name: 'Cummings Byers'
      },
      {
        id: 1,
        title: 'Hello, Travis White!',
        description: 'Non officia sint ipsum pariatur cupidatat incididunt reprehenderit nulla nisi velit. Quis cillum nostrud adipisicing mollit. Et sit aliqua ea velit exercitation mollit dolor non.',
        created_at: '2015-12-02T12:01:29Z',
        autor_name: 'Travis White'
      },
      {
        id: 2,
        title: 'Hello, Higgins Duncan!',
        description: 'Eu cupidatat cupidatat cillum laborum ea. Nulla deserunt ex ex mollit esse commodo. Exercitation enim nulla esse commodo pariatur amet mollit. Lorem deserunt in labore culpa consequat nisi. Proident sit ullamco nulla sit in mollit et. Non et id voluptate aliquip exercitation in mollit mollit nisi officia incididunt nulla cillum.',
        created_at: '2017-06-09T08:07:02Z',
        autor_name: 'Higgins Duncan'
      },
      {
        id: 3,
        title: 'Hello, Adams Love!',
        description: 'Nostrud adipisicing dolor ad voluptate aute velit qui laboris id tempor culpa. Cillum eu labore proident sunt nostrud Lorem cillum fugiat ex duis quis. Duis consequat ex incididunt esse laborum adipisicing.',
        created_at: '2017-11-20T07:51:13Z',
        autor_name: 'Adams Love'
      },
      {
        id: 4,
        title: 'Hello, Watson Whitney!',
        description: 'Eu adipisicing nisi veniam minim reprehenderit ut amet minim dolore ad esse elit. Fugiat minim et enim Lorem nisi nostrud. Aute amet culpa dolore sunt occaecat deserunt dolore culpa cillum Lorem. Dolore exercitation in eu occaecat non commodo ipsum elit magna est laboris sint. Ipsum ad mollit consequat mollit ullamco fugiat ullamco do tempor. In ullamco cillum duis velit veniam tempor eiusmod ipsum dolor. Pariatur adipisicing est dolor laborum.',
        created_at: '2016-09-06T01:58:57Z',
        autor_name: 'Watson Whitney'
      },
      {
        id: 5,
        title: 'Hello, Lopez Foster!',
        description: 'Nulla enim aliquip labore quis veniam dolore incididunt. Amet mollit aliquip id occaecat elit minim exercitation esse excepteur. Aliquip aute reprehenderit reprehenderit ex voluptate et ad ea anim incididunt minim tempor fugiat irure. Anim veniam quis velit eiusmod minim proident.',
        created_at: '2014-08-29T04:54:34Z',
        autor_name: 'Lopez Foster'
      }
    ],
    adId: undefined
  },
  getters: {
    getAds: state => {
      return state.ads.sort((a, b) => {
        if (a['created_at'] < b['created_at']) return 1
        if (a['created_at'] > b['created_at']) return -1
        return 0
      })
    },
    getAd: state => {
      return state.ads.find(ad => {
        return ad.id == state.adId
      })
    }
  },
  mutations: {
    pushUser(state, payload) {
      state.users.push(payload)
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload
    },
    setPasswordErr(state, payload) {
      state.passwordErr = payload
    },
    setAds(state, payload) {
      state.ads = payload
    },
    addAd(state, payload) {
      state.ads.push(payload)
    },
    setAdId(state, payload) {
      state.adId = payload
    },
    deleteAd(state, payload) {
      const ads = [...state.ads]
      for (let i = 0; i < ads.length; i++) {
        if (
          ads[i].id == payload.adId &&
          ads[i].autor_name === payload.user
        ) {
          ads.splice(i, 1)
          break;
        }
      }
      state.ads = ads

    }
  },
  actions: {
    AUTH_REQUEST({
      state,
      commit
    }, payload) {
      commit('setPasswordErr', false)
      const users = state.users;
      let result;
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === payload.username) {
          if (users[i].password === payload.password) {
            result = true
          } else {
            commit('setPasswordErr', true)
          }
          break
        }
      }
      if (result) {
        commit('setCurrentUser', payload)
      } else {
        if (state.passwordErr) {
          return
        }
        commit('pushUser', payload)
        commit('setCurrentUser', payload)
      }
    },
    AUTH_LOGOUT({
      commit
    }) {
      commit('setCurrentUser', undefined)
    },
    updateAd({
      state,
      commit
    }, payload) {
      const ads = [...state.ads]
      for (let i = 0; i < ads.length; i++) {
        if (ads[i].id === payload.id) {
          ads[i] = payload
          break
        }
      }
      commit('setAds', ads)
    }
  },
  plugins: [createPersistedState({
    key: 'data',
    paths: ['users', 'currentUser', 'ads']
  })]
})