import React from 'react';
import { shallow } from 'enzyme';
import { FilterModalVanilla } from '../views/FilterModal.view';

describe('FilterModal is shown', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      filters: {},
      theme: {
        colorPalette: {
          text: {
            lightgray: '#eeeeee',
          },
        },
      },
      labelsFilter: {},
      onSubmit: () => {},
    };

    wrapper = shallow(<FilterModalVanilla {...props} />);
  });

  it('should render FilterModal when show is false', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show filter modal', () => {
    const onSubmit = jest.fn();
    wrapper.setProps({
      onSubmit,
      navigation: {
        getParam: () => '',
      },
    });

    wrapper.instance().setState({ showSortModal: false });
    const modal = wrapper.find('[name="filters"]');
    modal.props().onSubmit({});
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should close modal on close', () => {
    wrapper.instance().onCloseModal();
    expect(wrapper.instance().state.showModal).toBeFalsy();
  });

  it('should close modal on press out', () => {
    wrapper.instance().onPressOut();
    expect(wrapper.instance().state.showModal).toBeFalsy();
  });

  it('should open modal on press filter', () => {
    wrapper.instance().onPressFilter();
    expect(wrapper.instance().state.showModal).toBeTruthy();
  });

  it('should open modal on press sort', () => {
    wrapper.instance().onPressSort();
    expect(wrapper.instance().state.showModal).toBeTruthy();
  });
});
