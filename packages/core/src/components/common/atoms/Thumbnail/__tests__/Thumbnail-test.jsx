import React from 'react';
import { shallow } from 'enzyme';

import { ThumbnailVanilla } from '../Thumbnail';

describe('Thumbnail component', () => {
  it('should renders correctly', () => {
    const props = {
      image: {
        id: 123,
        name: '',
        thumbnailPath: '',
      },
      isSelected: true,
      index: 0,
      totalCount: 2,
      className: '',
      onClick: jest.fn(),
    };
    const component = shallow(<ThumbnailVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
