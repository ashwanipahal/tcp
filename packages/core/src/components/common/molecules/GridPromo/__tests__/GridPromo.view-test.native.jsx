import React from 'react';
import { shallow } from 'enzyme';
import GridPromo from '../views/GridPromo.view.native';

describe('GridPromo component', () => {
  const props = {
    className: '',
    promoObj: {
      textItems: [{ text: '' }],
      subHeadLine: [{ text: '' }],
      promoWrapper: [{ text: '' }],
      mediaWrapper: [{ text: '' }],
      variation: '',
      navigation: {
        dispatch: jest.fn(),
      },
    },
  };

  it('renders correctly', () => {
    const component = shallow(<GridPromo {...props} />);
    expect(component).toMatchSnapshot();
  });
});
