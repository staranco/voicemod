<template>
  <div class="homepage">
    <div class="homepage-container">
      <section class="homepage-section" id='homepage-section--favs' v-if="favsCollection.length">
        <div class="homepage-section_title d-flex align-items-center">
          <h4 class="homepage-section_title_text text-uppercase">Favourite Voices</h4>
          <div class="homepage-section_title_line"></div>
        </div>

        <div class="homepage-voices-list">
          <Voice  v-for="voice in favsCollection"
                  :key="voice.id"
                  :voiceimage="require(`./../assets/${voice.icon}`)"
                  :voicename="voice.name"
                  :isSelected="selectedIndex === voice.id"
                  :isFav="voice.isFav ? voice.isFav : false"
                  @onFav="onFav(voice.id)"
                  @onSelect="onSelect(voice.id)">
          </Voice>
        </div>
      </section>

      <section class="homepage-section">
        <div class="homepage-section_title d-flex align-items-center">
          <h4 class="homepage-section_title_text text-uppercase">Pro Voices</h4>
          <div class="homepage-section_title_line"></div>
        </div>

        <div v-if="voiceslist" class="homepage-voices-list">
          <Voice  v-for="voice in filteredData"
                  :key="voice.id"
                  :id="voice.id"
                  :voiceimage="require(`./../assets/${voice.icon}`)"
                  :voicename="voice.name"
                  :isSelected="selectedIndex === voice.id"
                  :isFav="voice.isFav ? voice.isFav : false"
                  @onFav="onFav(voice.id)"
                  @onSelect="onSelect(voice.id)">
          </Voice>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Voice from './../components/voice';

export default {
  name: 'HomePage',
  components: {
    Voice,
  },
  props: {
    voices: Array,
    'search-query': String,
    'random-number': Number,
    'selected-option': Object,
  },
  data() {
    return {
      selectedIndex: null,
      favsCollection: [],
      voiceslist: this.voices,
    };
  },
  methods: {
    onSelect(index) {
      this.selectedIndex = this.selectedIndex === index ? null : index;
    },
    onFav(index) {
      const currentVoice = this.voiceslist.filter(voice => voice.id === index)[0];
      const isFav = currentVoice.isFav && currentVoice.isFav === true;

      currentVoice.isFav = !isFav;

      this.favsCollection = this.voices.filter(voice => voice.isFav === true);
    },
  },
  computed: {
    filteredData() {
      return (
        this.voiceslist.filter(
          voice => voice.name.toLowerCase().match(this.searchQuery.toLowerCase()))
      );
    },
  },
  watch: {
    randomNumber(e) {
      this.selectedIndex = this.voiceslist[e].id;
      const item = document.querySelector(`#${this.selectedIndex}`);
      item.scrollIntoView({ block: 'center', behavior: 'smooth' });
    },
    selectedOption(e) {
      if (e.selector === 'sort') {
        if (e.event === 'ascending') {
          this.voiceslist.sort((a, b) => (a.name > b.name ? 1 : -1));
        } else {
          this.voiceslist.sort((a, b) => (a.name > b.name ? -1 : 1));
        }
      } else {
        this.voiceslist = e.event === 'all' ?
          this.voices :
          this.voices.filter(voice => voice.tags[0] === e.event);
      }
    },
  },
};
</script>

<style scoped>
  .homepage-container { margin-top: 48px; }
  .homepage-section { padding: 0 56px; }
  .homepage-section_title_text {
    color: #808080;
    font-size: 1.125rem;
    font-weight: 500;
  }
  .homepage-section_title_line {
    flex: 1;
    height: 1px;
    background-color: #3e3d3d;
    margin-left: 8px;
  }
  .homepage-voices-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 36px;
    margin: 36px 0 36px 0;
  }

  @media (min-width: 768px) {
    .homepage-voices-list { grid-template-columns: repeat(4, 1fr); }
  }

  @media (min-width: 1200px) {
    .homepage-voices-list { grid-template-columns: repeat(6, 1fr); }
  }
</style>
