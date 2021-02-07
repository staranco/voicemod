import { shallowMount } from '@vue/test-utils';
import Search from '@/components/search';

describe('search.vue', () => {
  it('if delete input button is clicked, it should execute empty fn', () => {
    const wrapper = shallowMount(Search);
    wrapper.vm.emptySearch = jest.fn();
    wrapper.find('.input-search-close').trigger('click');
    expect(wrapper.vm.emptySearch).toBeCalled();
  });
});
