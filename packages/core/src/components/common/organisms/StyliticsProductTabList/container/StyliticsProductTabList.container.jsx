import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { styliticsProductTabListDataReq } from './StyliticsProductTabList.actions';
import { getStyliticsProductTabListSelector } from './StyliticsProductTabList.selector';
import ProductTabListView from '../views';

// TODO: Implementing fixed stylitics number till we get the CMS text-field updated.
const styliticsItemNumbers = ['2044392_10', '2044391_10', '3002623_BQ', '2081262_K3'];

/*
    Create a required data object for the ButtonTabs components
    which is being used in the ProductTabList view.
  */
function getButtonTabItems(tabItems) {
  return tabItems.map((item, index) => {
    const {
      // TODO: This should be uncommentted when the CMS category field gets updated with simple text.
      // category: { cat_id: catId } = {},
      text: { text },
    } = item;

    // TODO: This should be removed when the CMS category field gets updated with simple text.
    return { label: text, id: styliticsItemNumbers[index] };
    // TODO: This should be uncommentted when the CMS category field gets updated with simple text.
    // return { label: text, id: catId };
  });
}

/* Create a map of category Ids with the items.  */
function getTabItemsMap(tabItems) {
  return tabItems.reduce((map, item, index) => {
    // TODO: This should be uncommentted when the CMS category field gets updated with simple text.
    /* const {
      category: { cat_id: catId },
    } = item; */
    const tabsMap = map;
    // TODO: This should be uncommentted when the CMS category field gets updated with simple text.
    /* -tabsMap[catId] = item; */
    // TODO: This should be removed when the CMS category field gets updated with simple text.
    tabsMap[styliticsItemNumbers[index]] = item;
    return tabsMap;
  }, {});
}

let lastSelectedId = 0;
function StyliticsProductTabListContainer(props) {
  const {
    tabItems,
    dataLocator,
    styliticsProductTabList,
    getStyliticsProductTabListData,
    onProductTabChange,
    style,
    selectedColorProductId,
  } = props;
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  lastSelectedId = selectedColorProductId || 0;
  useEffect(() => {
    if (lastSelectedId !== 0 || selectedCategoryId) {
      const tabId = lastSelectedId === 0 ? selectedCategoryId : lastSelectedId;
      const categoryItem = getTabItemsMap(tabItems)[tabId];
      onProductTabChange(tabId, categoryItem);
      if (!styliticsProductTabList[tabId]) {
        getStyliticsProductTabListData({ categoryId: tabId });
      }
    } else {
      // TODO: This should be uncommentted when the CMS category field gets updated with simple text.
      /* const [item = {}] = tabItems;
      const { category: { cat_id: categoryId } = {} } = item;
      setSelectedCategoryId(categoryId); */
      // TODO: This should be removed when the CMS category field gets updated with simple text.
      setSelectedCategoryId(styliticsItemNumbers[0]);
    }
  }, [selectedCategoryId]);

  const buttonTabItems = getButtonTabItems(tabItems);

  const onSetSelectedCategoryId = id => {
    lastSelectedId = id;
    setSelectedCategoryId(id);
  };

  return buttonTabItems.length > 1 ? (
    <ProductTabListView
      selectedTabId={lastSelectedId === 0 ? selectedCategoryId : lastSelectedId}
      onTabChange={onSetSelectedCategoryId}
      tabs={buttonTabItems}
      dataLocator={dataLocator}
      style={style}
    />
  ) : null;
}

StyliticsProductTabListContainer.defaultProps = {
  getStyliticsProductTabListData: () => {},
  tabItems: [],
  styliticsProductTabList: {},
  onProductTabChange: () => {},
  dataLocator: '',
  style: [],
  selectedColorProductId: '',
};

StyliticsProductTabListContainer.propTypes = {
  getStyliticsProductTabListData: PropTypes.func,
  style: PropTypes.arrayOf(PropTypes.object),
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
  selectedColorProductId: PropTypes.string,
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
