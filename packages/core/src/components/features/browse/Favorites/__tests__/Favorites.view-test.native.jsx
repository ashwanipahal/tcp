import React from 'react';
import { shallow } from 'enzyme';
import { FavoritesViewVanilla } from '../views/Favorites.view.native';

describe('FavoritesViewVanilla', () => {
  let component;
  const props = {
    wishlistsSummaries: [],
    activeWishList: {},
    activeWishListId: 1,
    activeWishListProducts: [],
    filters: {},
    navigation: {},
    currencySymbol: '$',
    labels: {},
    selectedColorProductId: '',
    onGoToPDPPage: jest.fn(),
    onQuickViewOpenClick: jest.fn(),
    setLastDeletedItemId: jest.fn(),
    filteredId: '',
    sortId: '',
    onFilterSelection: jest.fn(),
    onSortSelection: jest.fn(),
    selectBrandType: '',
    gymSelected: false,
    tcpSelected: true,
    isDataLoading: false,
    labelsPlpTiles: {},
    getActiveWishlist: jest.fn(),
    defaultWishList: {},
    createNewWishList: jest.fn(),
    deleteWishList: jest.fn(),
    updateWishList: jest.fn(),
    isBothTcpAndGymProductAreAvailable: true,
    isKeepAliveEnabled: false,
    outOfStockLabels: {},
    userEmail: '',
    sendWishListEmail: jest.fn(),
    resetBrandFilters: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<FavoritesViewVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return ModalWrapper component value one', () => {
    expect(component.find('ModalWrapper')).toHaveLength(1);
  });

  it('should return Styled(BodyCopy) component value one', () => {
    expect(component.find('Styled(BodyCopy)')).toHaveLength(1);
  });

  it('should return Styled(LineComp) component value one', () => {
    expect(component.find('Styled(LineComp)')).toHaveLength(1);
  });

  it('should return Styled(View) component value four', () => {
    expect(component.find('Styled(View)')).toHaveLength(4);
  });

  it('should return NoFavoritesFound component value one', () => {
    expect(component.find('NoFavoritesFound')).toHaveLength(1);
  });
});
