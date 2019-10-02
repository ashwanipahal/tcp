import React from 'react';
import { shallow } from 'enzyme';

import { FullSizeImageModalVanilla } from '../views/FullSizeImageModal.view';

describe('FullSizeImageModal component', () => {
  it('should renders correctly', () => {
    const props = {
      onCloseClick: jest.fn(),
      className: '',
      name: '',
      image: '',
    };
    const component = shallow(<FullSizeImageModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
