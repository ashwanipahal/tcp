import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleL/mock';
import ModuleLTile from '../views/ModuleL.Tile';
import { DamImage } from '../../../atoms';

describe('ModuleL Header component', () => {
  let ModuleLTileComp;

  beforeEach(() => {
    ModuleLTileComp = shallow(<ModuleLTile tileData={mock.moduleL.composites.imageGrid[0]} />);
  });

  it('renders correctly', () => {
    expect(ModuleLTileComp).toMatchSnapshot();
  });

  it('should render carousel tile component', () => {
    expect(ModuleLTileComp.find('.moduleL__tile')).toHaveLength(1);
  });

  it('should render DAM image inside tile', () => {
    expect(ModuleLTileComp.find(DamImage)).toHaveLength(1);
  });
});
