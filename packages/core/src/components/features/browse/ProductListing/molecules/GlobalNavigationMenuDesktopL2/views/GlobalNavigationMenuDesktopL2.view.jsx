/* eslint-disable */
/**
 * Presentational component that renders a single entry of L1 navigation (such
 * as Girl, or Accessories) and it's associated L2 navigation.
 */

import React from 'react';

class GlobalNavigationMenuDesktopL2 extends React.Component {
  /**
   * @summary For the global Nav we need to group together groups that have a few menu items in the same column
   */
  get menuGroupings() {
    const { menuGroupings } = this.props;
    const groups = [];
    let tempGroups = [];
    let menuItemCount = 0;
    const maxItemsInGroup = 1; // requirments changes last minute to have one group per column

    // Group items that have leve then maxItemsInGroup in the same group
    for (let index = 0; index < menuGroupings.length; index += 1) {
      const group = menuGroupings[index];

      // if current bucket length plus these new items is less then threshold then bucket them together
      if (menuItemCount + group.menuItems.length <= maxItemsInGroup) {
        tempGroups.push(group);
      } else {
        // If the new items will push the bucket over the threshold then push current items to group and add new items to bucket
        if (tempGroups.length) {
          groups.push(tempGroups);
        }
        tempGroups = [];
        tempGroups.push(group);
        menuItemCount = 0;
      }

      menuItemCount += group.menuItems.length;
    }

    // Push any remaining groups
    if (tempGroups.length) {
      groups.push(tempGroups);
    }
    return groups;
  }

  render() {
    const {
      /* primaryContentSlotName, secondaryContentSlotName, */
      activeCategoryIds,
      navTree,
      isTopNav,
    } = this.props;

    // if (!this.menuGroupings.length) {
    //   return null;
    // }

    return (
      <div
        className="sub-menu-outer-container"
        role="menu"
        aria-hidden={isTopNav ? 'true' : 'false'}
      >
        <div className="sub-menu" role="menu">
          <div className="sub-menu-inner-container">
            {this.menuGroupings.map((groups, index) => {
              return (
                <NavGroupContainer
                  key={`column-${groups[0].groupName}`}
                  isLastGroup={index === this.menuGroupings.length - 1}
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
        const isActive = activeCategoryIds && item.categoryId === activeCategoryIds[1];
        // let className = cssClassName('sub-menu-category-item ');
        // let activeClassName = cssClassName('navigation-level-two-link ', { 'active': isActive });

        return (
          <React.Fragment>
            {item.displayToCustomer && (
              <li key={item.categoryId} id={`list-item-${item.categoryId}`} role="none">
                <a href={item.url}>{item.name}</a>
                {!isTopNav && isActive && (
                  <L3 menuItems={item.menuItems} activeCategoryIds={activeCategoryIds} />
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
      {menuItems.map(({ url, name, categoryId, displayToCustomer }) => {
        // let isActive = activeCategoryIds && categoryId === activeCategoryIds[2];
        // let className = cssClassName('sub-menu-category-item navigation-level-three-item ');

        return (
          <React.Fragment>
            {displayToCustomer && (
              <li key={categoryId} id={`list-item-${categoryId}`} role="none">
                <a href={url}>{name}</a>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}
