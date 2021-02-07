<template>
  <label class="input-search position-relative d-flex" for="search">
    <i aria-hidden="true" class="input-search-icon"></i>
    <input  type="text"
            name="search"
            :value="queryString"
            @input="updateFilter" />
    <i aria-hidden="true" class="input-search-close" @click="emptySearch()"></i>
  </label>
</template>

<script>
export default {
  name: 'Search',
  props: ['query'],
  data() {
    return {
      queryString: this.query,
    };
  },
  methods: {
    updateFilter(e) {
      this.$emit('update:query', e.target.value);
    },
    emptySearch() {
      this.queryString = '';
      this.$emit('update:query', this.queryString);
    },
  },
};
</script>

<style  scoped>
  .input-search {
    background-color: #000;
    border-radius: 25px;
    height: 32px;
    min-width: 230px;
    padding: 0 32px;

    & .input-search-icon {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background-image: url('./../assets/search.svg');
        background-size: cover;
      }
    }

    & input { flex: 1; }

    & .input-search-close {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        background-image: url('./../assets/search-close.svg');
        background-size: cover;
      }
    }
  }
</style>
