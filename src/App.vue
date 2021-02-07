<template>
  <div id="app" v-if="voices">
    <Header :voices="voices"
            :query.sync="searchQuery"
            @onUpdateSelect="selectedOption = $event"
            @onRandomize="rndm = $event">
    </Header>
    <router-view  :voices="voices"
                  :search-query="searchQuery"
                  :random-number="rndm"
                  :selected-option="selectedOption"/>

  </div>
</template>

<script>
import VoicesData from './data/voices.json';
import Header from './components/header';

export default {
  name: 'App',
  components: {
    Header,
  },
  async created() {
    const voices = VoicesData;
    if (voices && voices.length > 0) {
      this.voices = voices;
    }
  },
  data() {
    return {
      voices: null,
      searchQuery: '',
      rndm: null,
      selectedOption: {},
    };
  },
};
</script>
