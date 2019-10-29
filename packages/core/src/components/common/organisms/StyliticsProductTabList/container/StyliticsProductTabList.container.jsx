import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { styliticsProductTabListDataReq } from './StyliticsProductTabList.actions';
import { getStyliticsProductTabListSelector } from './StyliticsProductTabList.selector';
import ProductTabListView from '../views';

/*
    Create a required data object for the ButtonsTabs components
    which is being used in the ProductTabList view.
  */
function getButtonTabItems(tabItems) {
  return tabItems.map(item => {
    const {
      stylistic: { styl_id: catId } = {},
      text: { text },
    } = item;

    return { label: text, id: catId };
  });
}

/* Create a map of stylistic Ids with the items.  */
function getTabItemsMap(tabItems) {
  return tabItems.reduce((map, item) => {
    const {
      stylistic: { styl_id: catId },
    } = item;
    const tabsMap = map;
    tabsMap[catId] = item;
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
      const [item = {}] = tabItems;
      const { stylistic: { styl_id: categoryId } = {} } = item;
      setSelectedCategoryId(categoryId);
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
