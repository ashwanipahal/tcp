import React from 'react';
import { shallow } from 'enzyme';
import { StoreSelector, StoresCountryTile } from '../../../../../common/molecules';
import { StoreListVanilla } from '../views/StoreList';
import labelsMock from '../__mocks__/labels.mock';
import list from '../__mocks__/results.mock';

describe('StoreList component', () => {
  it('StoreList component renders correctly without props', () => {
    const component = shallow(<StoreListVanilla />);
    expect(component).toMatchSnapshot();
  });

  it('Component should render with props', () => {
    const props = {
      className: 'test-class1',
      labels: labelsMock,
      storesList: {
        storeListUS: list.StoreListReducer.storesSummaryListUS,
        storeListCA: list.StoreListReducer.storesSummaryListCA,
      },
    };
    const component = shallow(<StoreListVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('StoreSelector component should render', () => {
    const props = {
      className: 'test-class2',
      labels: labelsMock,
      storesList: {
        storeListUS: list.StoreListReducer.storesSummaryListUS,
        storeListCA: list.StoreListReducer.storesSummaryListCA,
      },
    };
    const component = shallow(<StoreListVanilla {...props} />);
    expect(component.find(StoreSelector)).toHaveLength(1);
  });

  it('StoresCountryTile component should render', () => {
    const props = {
      className: 'test-class3',
      labels: labelsMock,
      storesList: {
        storeListUS: list.StoreListReducer.storesSummaryListUS,
        storeListCA: list.StoreListReducer.storesSummaryListCA,
      },
    };
    const component = shallow(<StoreListVanilla {...props} />);
    expect(component.find(StoresCountryTile)).toHaveLength(
      props.storesList.storeListUS.length + props.storesList.storeListCA.length
    );
  });

  it('StoresCountryTile component should not render ', () => {
    const props = {
      className: 'test-class4',
      labels: labelsMock,
      storesList: {
        storeListUS: [],
        storeListCA: [],
      },
    };
    const component = shallow(<StoreListVanilla {...props} />);
    expect(component.find(StoresCountryTile)).toHaveLength(0);
  });

  it('StoreSelector component should not render', () => {
    const props = {
      className: 'test-class5',
      labels: labelsMock,
      storesList: {
        storeListUS: [],
        storeListCA: [],
      },
    };
    const component = shallow(<StoreListVanilla {...props} />);
    expect(component.find(StoreSelector)).toHaveLength(0);
  });
});
