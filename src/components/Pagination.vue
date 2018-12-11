<template>
    <div v-if="totalPages().length > 1" class='pagination-wrapper'>
    <span
            v-if="showPreviousLink()"
            @click='updatePage(currentPage - 1)' class='pagination-btn'>
        <img class="arrow" src="../assets/back.svg" alt="">
    </span>
        <span :class="currentPage + 1 === item ? 'pagination__nav--active' : ''"
              class="pagination__nav"
              @click="updatePage(item - 1)"
              v-for="item in totalPages()"
              :key="item">
            {{item}}
        </span>

        <span
                v-if="showNextLink()"
                @click='updatePage(currentPage + 1)' class='pagination-btn'>
            <img class="arrow" src="../assets/right-arrow.svg" alt="">
        </span>
    </div>
</template>
<script>
  export default {
    name: 'Pagination',
    data () {
      return {}
    },
    props: {
      visibleObj: {
        type: Array,
        required: true
      },
      ads: {
        type: Array,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
      pageSize: {
        type: Number,
        required: true
      }
    },
    methods: {
      updatePage (pageNumber) {
        this.$emit('page:update', pageNumber)
      },
      totalPages () {
        const collection = [];
        for (let i = 0; i < Math.ceil(this.ads.length / this.pageSize); i++) {
          collection.push(i + 1);
        }
        return [...collection];
      },
      showPreviousLink () {
        return this.currentPage !== 0
      },
      showNextLink () {
        return this.currentPage !== (this.totalPages().length - 1)
      }
    },

  }
</script>

<style>
    .pagination-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pagination-btn {
        cursor: pointer;
    }

    .pagination__nav {
        margin: 5px;
        cursor: pointer;
    }

    .pagination__nav--active {
        padding: 5px;
        background: white;
        color: #212121;
        border-radius: 3px;
    }

    .pagination-wrapper {
        display: flex;
        justify-content: center;
    }

    .arrow {
        width: 12px;
    }
</style>
