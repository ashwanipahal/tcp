import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import { ImageGridVanilla as ImageGrid } from '../ImageGrid';

let ImageGridComp;

beforeEach(() => {
  const wrapper = shallow(
    <ImageGrid
      mediaLinkedList={mock.moduleK.composites.masonryGrid[0].mediaLinkedList}
      className="image-grid"
      colM={2}
      dataLocator="moduleK_image_"
    />
  ).get(0);
  ImageGridComp = shallow(wrapper);
});

describe('Image grid component', () => {
  it('renders correctly', () => {
    expect(ImageGridComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(ImageGridComp.find('.image-col')).toHaveLength(4);
  });
});
