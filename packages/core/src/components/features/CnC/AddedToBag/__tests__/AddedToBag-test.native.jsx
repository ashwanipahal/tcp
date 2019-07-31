import React from 'react';
import { shallow } from 'enzyme';
import { AddedToBagVanilla } from '../views/AddedToBag.view.native';

describe('AddedToBag Component', () => {
  let component;
  const props = {
    openState: Function,
    onRequestClose: Function,
    className: '',
    addedToBag: {},
    labels: {},
  };

  beforeEach(() => {
    component = shallow(<AddedToBagVanilla {...props} />);
  });

  it('AddedToBag should be defined', () => {
    expect(component).toBeDefined();
  });

  it('AddedToBag should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
