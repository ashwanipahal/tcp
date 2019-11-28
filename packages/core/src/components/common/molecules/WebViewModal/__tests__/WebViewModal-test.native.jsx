import React from 'react';
import { shallow } from 'enzyme';
import WebViewModal from '../views/WebViewModal.native';

describe('WebViewModal component', () => {
  it('WebViewModal component renders correctly without props', () => {
    const component = shallow(<WebViewModal />);
    expect(component).toMatchSnapshot();
  });
});
