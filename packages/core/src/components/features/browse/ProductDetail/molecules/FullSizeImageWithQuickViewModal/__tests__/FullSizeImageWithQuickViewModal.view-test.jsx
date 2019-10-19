import React from 'react';
import { shallow } from 'enzyme';

import { FullSizeImageWithQuickViewModalVanilla } from '../views/FullSizeImageWithQuickViewModal.view';

describe('FullSizeImageWithQuickViewModal component', () => {
  it('should renders correctly', () => {
    const props = {
      isMobile: false,
      onCloseClick: jest.fn(),
      name: '',
      isThumbnailListVisible: true,
      images: [
        {
          iconSizeImageUrl: '',
          regularSizeImageUrl: '',
          bigSizeImageUrl: '',
          superSizeImageUrl: '',
        },
      ],
    };
    const component = shallow(<FullSizeImageWithQuickViewModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
