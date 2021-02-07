import { mount } from '@vue/test-utils';
import HomePage from '@/pages/HomePage';

describe('HomePage.vue', () => {
  test('if there are not favs selected, do not show favs section', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.find('#homepage-section--favs').exists()).toBe(false);
  });
});
