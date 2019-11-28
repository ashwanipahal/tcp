import React from 'react';
import { shallow } from 'enzyme';
import LoaderView from '../Loader.container';
import Loader from '../../views/Loader.view';

describe('LoaderView Container', () => {
  const props = {
    loaderState: true,
    miniBagLoaderState: false,
    addedToBagLoaderState: true,
  };
  it('should render LoaderView view section', () => {
    const tree = shallow(<LoaderView {...props} />);
    expect(tree.is(Loader)).toBeFalsy();
  });
});
