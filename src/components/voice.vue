<template>
  <div  class="voice position-relative d-flex flex-column align-items-center"
        :class="{'voice--fav': isFav, 'voice--selected': isSelected}">
    <div class="voice-fav-icon position-absolute" @click="toggleFav()"></div>
    <div class="voice-image position-relative" @click="toggleSelected()">
      <img :src="voiceimage" :alt="voicename" class="position-relative"/>
    </div>
    <h6 class="voice-name">{{voicename}}</h6>
  </div>
</template>

<script>
export default {
  name: 'Voice',
  props: {
    voiceimage: String,
    voicename: String,
    isSelected: Boolean,
    isFav: Boolean,
  },
  methods: {
    toggleFav() {
      this.$emit('onFav');
    },
    toggleSelected() {
      this.$emit('onSelect');
    },
  },
};
</script>

<style scoped>
  .voice {
    cursor: pointer;

    /* Voice image */
    & .voice-image {
      width: 113px;
      height: 113px;
      border-radius: 100%;
      overflow: hidden;
      background: #d2d2d2;

      & img { z-index: 1; }

      /* Used this ::before to avoid black bg during transition to white from linear-gradient */
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;
        opacity: 0;
        background: rgb(0,197,255);
        background: linear-gradient(29deg, rgba(0,197,255,1) 0%, rgba(1,228,255,1) 100%);
      }
    }

    &:hover .voice-image { background: #fff; }

    &.voice--selected .voice-image::before { opacity: 1; }

    /* Voice fav icon */
    & .voice-fav-icon {
      top: 0;
      right: 0;
      z-index: 2;
      width: 32px;
      height: 32px;
      border-radius: 100%;
      background-color: #fff;
      opacity: 0;
      transition: opacity;

      &::before {
        content: '';
        background: url('./../assets/voice-favourite-off.svg') no-repeat 100%;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }

    &:hover .voice-fav-icon {
      opacity: 1;
      transition: opacity .1s;
    }

    &.voice--fav .voice-fav-icon::before {
      background: url('./../assets/voice-favourite.svg') no-repeat 100%;
    }

    /* Voice name */
    & .voice-name {
      font-weight: 500;
      font-size: 0.875rem;
      margin-top: 4px;
      color: #d2d2d2;
    }

    &:hover .voice-name { color: #fff; }

    &.voice--selected .voice-name { color: rgb(0,197,255); }
  }
</style>
