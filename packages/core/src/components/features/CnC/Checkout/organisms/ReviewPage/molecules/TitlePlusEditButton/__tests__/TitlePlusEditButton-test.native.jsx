import React from 'react';
import { shallow } from 'enzyme';
import { TitlePlusEditButtonVanilla } from '../views/TitlePlusEditButton.native';

describe('TitlePlusEditButton component', () => {
  it('should renders correctly props not present', () => {
    const props = { title: '', editTitle: '', className: '', dataLocator: '', onEdit: jest.fn() };
    const component = shallow(<TitlePlusEditButtonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly props are present', () => {
    const props = {
      title: '',
      editTitle: '',
      className: '',
      dataLocator: '',
    };
    const component = shallow(<TitlePlusEditButtonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
