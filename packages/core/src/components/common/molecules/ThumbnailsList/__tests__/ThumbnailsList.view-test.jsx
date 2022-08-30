import React from 'react';
import { shallow } from 'enzyme';

import ThumbnailsList from '../ThumbnailsList.view';

describe('ThumbnailsList component', () => {
  it('should renders correctly', () => {
    const props = {
      images: [
        {
          name: '',
          thumbnailPath: '',
          id: 12,
        },
        {
          name: '',
          thumbnailPath: '',
          id: 12,
        },
      ],
      onThumbnailClick: jest.fn(),
      selectedImageIndex: 0,
    };
    const component = shallow(<ThumbnailsList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
