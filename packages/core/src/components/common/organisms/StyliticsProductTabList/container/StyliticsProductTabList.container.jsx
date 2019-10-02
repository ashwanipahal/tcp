import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { styliticsProductTabListDataReq } from './StyliticsProductTabList.actions';
import { getStyliticsProductTabListSelector } from './StyliticsProductTabList.selector';
import ProductTabListView from '../views';

/*
    Create a required data object for the ButtonTabs components
    which is being used in the ProductTabList view.
  */
function getButtonTabItems(tabItems) {
  return tabItems.map(item => {
    const {
      category: { cat_id: catId } = {},
      text: { text },
    } = item;
    return { label: text, id: catId };
  });
}

/* Create a map of category Ids with the items.  */
function getTabItemsMap(tabItems) {
  return tabItems.reduce((map, item) => {
    const {
      category: { cat_id: catId },
    } = item;
    const tabsMap = map;
    tabsMap[catId] = item;
    return tabsMap;
  }, {});
}

function StyliticsProductTabListContainer(props) {
  const {
    tabItems,
    dataLocator,
    styliticsProductTabList,
    getStyliticsProductTabListData,
    onProductTabChange,
  } = props;
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    if (selectedCategoryId) {
      const categoryItem = getTabItemsMap(tabItems)[selectedCategoryId];
      onProductTabChange(selectedCategoryId, categoryItem);
      if (!styliticsProductTabList[selectedCategoryId]) {
        getStyliticsProductTabListData({ categoryId: selectedCategoryId });
      }
    } else {
      const [item = {}] = tabItems;
      const { category: { cat_id: categoryId } = {} } = item;
      setSelectedCategoryId(categoryId);
    }
  }, [selectedCategoryId]);

  const buttonTabItems = getButtonTabItems(tabItems);

  return (
    <ProductTabListView
      selectedTabId={selectedCategoryId}
      onTabChange={setSelectedCategoryId}
      tabs={buttonTabItems}
      dataLocator={dataLocator}
    />
  );
}

StyliticsProductTabListContainer.defaultProps = {
  getStyliticsProductTabListData: () => {},
  tabItems: [],
  styliticsProductTabList: {},
  onProductTabChange: () => {},
  dataLocator: '',
};

StyliticsProductTabListContainer.propTypes = {
  getStyliticsProductTabListData: PropTypes.func,
  tabItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  styliticsProductTabList: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        uniqueId: PropTypes.string.isRequired,
        imageUrl: PropTypes.array.isRequired,
        seo_token: PropTypes.string,
      })
    )
  ),
  onProductTabChange: PropTypes.func,
  dataLocator: PropTypes.string,
};

export const mapStateToProps = state => {
  return {
    styliticsProductTabList: getStyliticsProductTabListSelector(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getStyliticsProductTabListData: payload => {
      dispatch(styliticsProductTabListDataReq(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyliticsProductTabListContainer);

export { StyliticsProductTabListContainer as StyliticsProductTabListContainerVanilla };
