import React from 'react';
import { shallow } from 'enzyme';
import { FilterModalVanilla } from '../views/FilterModal.view';

describe('FilterModal is shown', () => {
  const props = {
    handleClose: jest.fn(),
    show: true,
    className: '',
    classNames: ''
  };

  const props1 = {
    handleClose: jest.fn(),
    show: false,
    className: '',
    classNames: ''
  };

  it('should render FilterModal', () => {
    const component = shallow(<FilterModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render FilterModal when show is false', () => {
    const component = shallow(<FilterModalVanilla {...props1} />);
    expect(component).toMatchSnapshot();
  });
});
