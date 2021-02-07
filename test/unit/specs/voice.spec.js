import { shallowMount } from '@vue/test-utils';
import Voice from '@/components/voice';

describe('voice.vue', () => {
  const wrapper = shallowMount(Voice, {
    propsData: {
      isSelected: false,
      isFav: false,
    },
  });

  wrapper.vm.toggleFav = jest.fn();
  wrapper.vm.toggleSelected = jest.fn();

  it('voice must be unselected and unfaved xD', () => {
    expect(wrapper.props().isSelected).toBe(false);
    expect(wrapper.props().isFav).toBe(false);
  });

  wrapper.find('.voice-fav-icon').trigger('click');
  expect(wrapper.vm.toggleFav).toBeCalled();

  wrapper.find('.voice-image').trigger('click');
  expect(wrapper.vm.toggleSelected).toBeCalled();
});
