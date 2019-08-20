/* eslint-disable */
/**
 * Presentational component that renders a single entry of L1 navigation (such
 * as Girl, or Accessories) and it's associated L2 navigation.
 */

import React from 'react';
import PropTypes from 'prop-types';

class GlobalNavigationMenuDesktopL2 extends React.Component {
  constructor() {
    super();
    this.menuGroupings = this.menuGroupings.bind(this);
  }

  menuGroupings = () => {
    const { navigationTree } = this.props;
    const groups = [];
    // let menuItemCount = 0;
    // const maxItemsInGroup = 1;

    const subCategoryArr =
      (navigationTree.subCategories && Object.keys(navigationTree.subCategories)) || [];
    for (let i = 0; i < subCategoryArr.length; i += 1) {
      const tempGroups = [];
      if (navigationTree.subCategories && navigationTree.subCategories[subCategoryArr[i]]) {
        tempGroups.push({
          groupName: subCategoryArr[i],
          menuItems: navigationTree.subCategories[subCategoryArr[i]],
        });
      }
      groups.push(tempGroups);
    }
    return groups;

    // Group items that have leve then maxItemsInGroup in the same group
    // for (let index = 0; index < navigationTree.subCategories.Categories.length; index += 1) {
    //   const group = navigationTree.subCategories.Categories[index];

    //   // if current bucket length plus these new items is less then threshold then bucket them together
    //   if (menuItemCount + group.length <= maxItemsInGroup) {
    //     tempGroups.push(group);
    //   } else {
    //     // If the new items will push the bucket over the threshold then push current items to group and add new items to bucket
    //     if (tempGroups.length) {
    //       groups.push(tempGroups);
    //     }
    //     tempGroups = [];
    //     tempGroups.push(group);
    //     menuItemCount = 0;
    //   }

    //   menuItemCount += group.subCategories.Categories.length;
    // }

    // // Push any remaining groups
    // if (tempGroups.length) {
    //   groups.push(tempGroups);
    // }
    // return groups;
  };

  /**
   * @summary For the global Nav we need to group together groups that have a few menu items in the same column
   */
  render() {
    const {
      /* primaryContentSlotName, secondaryContentSlotName, */
      activeCategoryIds,
      navTree,
      isTopNav,
    } = this.props;

    const menuGroupingArr = this.menuGroupings();

    if (!menuGroupingArr.length) {
      return null;
    }

    return (
      <div
        className="sub-menu-outer-container"
        role="menu"
        aria-hidden={isTopNav ? 'true' : 'false'}
      >
        <div className="sub-menu" role="menu">
          <div className="sub-menu-inner-container">
            {menuGroupingArr.map((groups, index) => {
              return (
                <NavGroupContainer
                  key={`column-${groups.groupName}`}
                  isLastGroup={index === menuGroupingArr.length - 1}
                  {...{ groups, activeCategoryIds, isTopNav }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalNavigationMenuDesktopL2;

// This is a column
function NavGroupContainer(props) {
  let { groups, activeCategoryIds, isTopNav, isLastGroup, className } = props;

  /* let className = cssClassName({
    'sub-menu-group ': true,
    'navigation-level-two-item ': true,
    'last-group ': isLastGroup
  }); */

  return (
    <div className={className}>
      {groups.map(({ menuItems, groupName } /* , index */) => {
        // let className = `group-title group-index-${index + 1} sub-menu-outliers-group`
        return (
          <div key={`group-${groupName}`} className={className}>
            <h2>{groupName}</h2>
            <L2 {...{ menuItems, activeCategoryIds, isTopNav }} />
          </div>
        );
      })}
    </div>
  );
}

function L2({ menuItems, activeCategoryIds, isTopNav }) {
  return (
    <ol className="sub-menu-category" role="none">
      {menuItems.map(item => {
        const isActive = activeCategoryIds && item.categoryContent.id === activeCategoryIds[1];
        // let className = cssClassName('sub-menu-category-item ');
        // let activeClassName = cssClassName('navigation-level-two-link ', { 'active': isActive });

        return (
          <React.Fragment>
            {item.categoryContent.name && (
              <li
                key={item.categoryContent.id}
                id={`list-item-${item.categoryContent.id}`}
                role="none"
              >
                <a href={item.url}>{item.categoryContent.name}</a>
                {!isTopNav && isActive && (
                  <L3 menuItems={item.subCategories} activeCategoryIds={activeCategoryIds} />
                )}
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}

function L3({ menuItems, activeCategoryIds }) {
  return (
    <ol className="sub-menu-category sub-menu-category-level-three" role="none">
      {menuItems.map(({ categoryContent: { name, categoryId }, url }) => {
        // let isActive = activeCategoryIds && categoryId === activeCategoryIds[2];
        // let className = cssClassName('sub-menu-category-item navigation-level-three-item ');

        return (
          <React.Fragment>
            {
              <li key={categoryId} id={`list-item-${categoryId}`} role="none">
                <a href={url}>{name}</a>
              </li>
            }
          </React.Fragment>
        );
      })}
    </ol>
  );
}

L2.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({})),
  activeCategoryIds: PropTypes.arrayOf(PropTypes.shape({})),
  isTopNav: PropTypes.bool,
};

L2.defaultProps = {
  menuItems: [],
  activeCategoryIds: [],
  isTopNav: false,
};

L3.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({})),
  activeCategoryIds: PropTypes.arrayOf(PropTypes.shape({})),
};

L3.defaultProps = {
  menuItems: [],
  activeCategoryIds: [],
};
