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

function StyliticsProductTabListContainer(props) {
  const {
    tabItems,
    dataLocator,
    styliticsProductTabList,
    getStyliticsProductTabListData,
    onProductTabChange,
    style,
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
      // TODO: This should be uncommentted when the CMS category field gets updated with simple text.
      /* const [item = {}] = tabItems;
      const { category: { cat_id: categoryId } = {} } = item;
      setSelectedCategoryId(categoryId); */
      // TODO: This should be removed when the CMS category field gets updated with simple text.
      setSelectedCategoryId(styliticsItemNumbers[0]);
    }
  }, [selectedCategoryId]);

  const buttonTabItems = getButtonTabItems(tabItems);

  return buttonTabItems.length > 1 ? (
    <ProductTabListView
      selectedTabId={selectedCategoryId}
      onTabChange={setSelectedCategoryId}
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
