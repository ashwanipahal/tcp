import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import ImageGrid from '../ImageGrid.native';

describe('ImageGrid native component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <ImageGrid
        mediaList={mock.moduleK.composites.masonryGrid[0].mediaList}
        dataLocator="moduleK_image_"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
