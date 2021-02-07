<template>
  <div class="select">
    <div  class="select-container position-relative text-left"
          :tabindex="tabindex"
          @blur="open = false">
      <div  class="select-container_selected text-capitalize"
            :class="{ 'select-container_selected--open': open }"
            @click="open = !open">
        {{ selected }}
      </div>
      <div   class="select-container_items position-absolute"
            :class="{ 'd-none': !open }">
        <div  v-for="(option, i) of options"
              :key="i"
              class="select-container_items_option text-capitalize"
              @click="selectOption(option)">
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      required: false,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  methods: {
    selectOption(e) {
      this.selected = e;
      this.open = false;
      this.$emit('select', this.selected);
    },
  },
  async created() {
    if (this.options && this.options.length > 0) {
      this.selected = this.default ? this.default : this.options[0];
    }
  },
  data() {
    return {
      selected: null,
      open: false,
    };
  },
  mounted() {
    this.$emit('select', this.selected);
  },
};
</script>

<style  scoped>
  .select {
    & .select-container {
      min-width: 130px;
      outline: none;
      height: 32px;
      line-height: 32px;

      &  .select-container_selected {
        background-color: #0a0a0a;
        border-radius: 4px;
        color: #fff;
        padding-left: 16px;
        cursor: pointer;
        user-select: none;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          background-image: url('./../assets/select-arrow.svg');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        &.select-container_selected--open {
          border-radius: 4px 4px 0px 0px;

          &::after { transform: translateY(-50%) rotate(180deg); }
        }
      }

      &  .select-container_items {
        color: #fff;
        border-radius: 0px 0px 4px 4px;
        overflow: hidden;
        background-color: #0a0a0a;
        left: 0;
        right: 0;
        z-index: 1;

        &  div {
          color: #808080;
          border-top: 1px solid #3e3d3d;
          padding-left: 16px;
          cursor: pointer;
          user-select: none;

          &:hover { color: #fff; }
        }
      }
    }
  }
</style>
