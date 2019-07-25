import React from 'react';
import { Text, View } from 'react-native';
import { shallow } from 'enzyme';
import { AddedToBagVanilla } from '../views/AddedToBag.view.native';

import Modal from '../../../../common/molecules/Modal';

describe('AddedToBag Component', () => {
  let component;
  const props = {
    openState: Function,
    onRequestClose: Function,
    className: '',
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

  it('AddedToBag should return Modal component value one', () => {
    expect(component.find(Modal)).toHaveLength(1);
  });

  it('AddedToBag should return View component value one', () => {
    expect(component.find(View)).toHaveLength(1);
  });

  it('AddedToBag should return Text component value one', () => {
    expect(component.find(Text)).toHaveLength(1);
  });
});
