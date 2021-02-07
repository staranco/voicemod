<template>
  <div class="header position-sticky">
    <div class="header-container d-flex justify-content-between">
      <Search v-on:update:query="onSearch"></Search>
      <div class="header-filters d-flex">
        <div class="header-filters_filter d-flex align-items-center" v-if="filterOptions">
          <i aria-hidden="true" class="header-filters_filter_icon filter-icon d-inline-block"></i>
          <Select :options="filterOptions"
                  v-on:select="onFilter"></Select>
        </div>
        <div class="header-filters_filter d-flex align-items-center" v-if="orderOptions">
          <i aria-hidden="true" class="header-filters_filter_icon order-icon d-inline-block"></i>
          <Select :options="orderOptions"
                  v-on:select="onSort"></Select>
        </div>

        <button type="button"
                class="header-filters_randomize-btn position-relative"
                @click="randomize()">
          <i aria-hidden="true" class="header-filters_randomize-btn_icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../components/search';
import Select from '../components/select';

export default {
  name: 'Header',
  components: {
    Search,
    Select,
  },
  props: {
    voices: Array,
  },
  async created() {
    if (this.voices && this.voices.length > 0) {
      const categories = this.voices.map(voice => voice.tags[0]);
      this.filterOptions = categories.filter((item, index) => categories.indexOf(item) === index);
      this.filterOptions.unshift('all');
    }
  },
  data() {
    return {
      filterOptions: null,
      orderOptions: ['ascending', 'descending'],
    };
  },
  methods: {
    onSearch(e) {
      this.$emit('update:query', e);
    },
    onFilter(e) {
      this.$emit('onUpdateSelect', {
        event: e,
        selector: 'filter',
      });
    },
    onSort(e) {
      this.$emit('onUpdateSelect', {
        event: e,
        selector: 'sort',
      });
    },
    randomize() {
      const rndm = Math.floor(Math.random() * (this.voices.length - 0)) + 0;
      this.$emit('onRandomize', rndm);
    },
  },
};
</script>

<style scoped>
.header {
  z-index: 3;
  top: 0;
  background-color: #1b1b1b;
  box-shadow: -1px -1px 8px 2px #1b1b1b;

  & .header-container {
    padding: 16px 0;

    & .header-filters {
      & > *:not(:last-child) { margin-right: 36px; }

      & .header-filters_randomize-btn {
        background: transparent;
        border: none;
        outline: none;
        height: 32px;
        width: 32px;
        border-radius: 4px;

        &:hover { background: #000; }

        & .header-filters_randomize-btn_icon {
          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 4px;
            transform: translateY(-50%);
            width: 24px;
            height: 24px;
            background-image: url('./../assets/button-random.svg');
            background-size: cover;
          }
        }
      }

      & .header-filters_filter {
        & .header-filters_filter_icon {
          min-width: 24px;
          height: 24px;
          background-size: cover;
          background-repeat: no-repeat;
          margin-right: 8px;

          &.filter-icon { background-image: url('./../assets/filter.svg'); }
          &.order-icon { background-image: url('./../assets/order.svg'); }
        }
      }
    }
  }
}
</style>
