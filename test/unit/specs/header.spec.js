import { mount } from '@vue/test-utils';
import Header from '@/components/header';

describe('header.vue', () => {
  test('if randomize button is clicked, it should execute randomize fn', () => {
    const wrapper = mount(Header);
    wrapper.vm.randomize = jest.fn();
    wrapper.find('.header-filters_randomize-btn').trigger('click');
    expect(wrapper.vm.randomize).toBeCalled();
  });
});
