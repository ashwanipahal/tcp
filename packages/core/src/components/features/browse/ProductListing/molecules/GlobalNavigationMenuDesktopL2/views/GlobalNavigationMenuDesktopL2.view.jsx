/* eslint-disable extra-rules/no-commented-out-code */
/**
 * Presentational component that renders a single entry of L1 navigation (such
 * as Girl, or Accessories) and it's associated L2 navigation.
 */

import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import errorBoundary from '../../../../../../common/hoc/withErrorBoundary';
import withStyles from '../../../../../../common/hoc/withStyles';
import GlobalNavL2Style from '../GlobalNavigationMenuDesktopL2.style';

class GlobalNavigationMenuDesktopL2 extends React.Component {
  static propTypes = {
    activeCategoryIds: PropTypes.arrayOf(PropTypes.string),
    navTree: PropTypes.shape({}),
    isTopNav: PropTypes.bool,
    navigationTree: PropTypes.shape({}),
    className: PropTypes.string,
  };

  static defaultProps = {
    activeCategoryIds: [],
    navTree: {},
    isTopNav: false,
    navigationTree: {},
    className: '',
  };

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
          groupName: navigationTree.subCategories[subCategoryArr[i]].label,
          menuItems: navigationTree.subCategories[subCategoryArr[i]].items,
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
      /* navTree, */
      isTopNav,
      className,
    } = this.props;

    const menuGroupingArr = this.menuGroupings();

    if (!menuGroupingArr.length) {
      return null;
    }

    return (
      <div
        className={`${className} sub-menu-outer-container`}
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
export default withStyles(errorBoundary(GlobalNavigationMenuDesktopL2), GlobalNavL2Style);
export { GlobalNavigationMenuDesktopL2 as GlobalNavigationMenuDesktopL2Vanilla };

// This is a column
const NavGroupContainer = props => {
  const { groups, activeCategoryIds, isTopNav, isLastGroup, className } = props;

  /* let className = cssClassName({
    'sub-menu-group ': true,
    'navigation-level-two-item ': true,
    'last-group ': isLastGroup
  }); */

  return (
    <div className={`${isLastGroup}${className}`}>
      {groups.map(({ menuItems, groupName } /* , index */) => {
        // let className = `group-title group-index-${index + 1} sub-menu-outliers-group`
        return (
          <div key={`group-${groupName}`} className={className}>
            <BodyCopy
              className="group-heading"
              component="h2"
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="extrabold"
              color="text.primary"
            >
              {groupName}
            </BodyCopy>
            <L2 {...{ menuItems, activeCategoryIds, isTopNav }} />
          </div>
        );
      })}
    </div>
  );
};

NavGroupContainer.propTypes = {
  groups: PropTypes.shape({}),
  activeCategoryIds: PropTypes.arrayOf(PropTypes.string),
  isTopNav: PropTypes.bool,
  isLastGroup: PropTypes.bool,
  className: PropTypes.string,
};

NavGroupContainer.defaultProps = {
  groups: {},
  activeCategoryIds: [],
  isTopNav: false,
  isLastGroup: false,
  className: '',
};

function L2({ menuItems, activeCategoryIds, isTopNav }) {
  return (
    <BodyCopy
      component="ol"
      className="sub-menu-category"
      fontFamily="secondary"
      fontSize="fs14"
      color="text.primary"
      role="none"
    >
      {menuItems.map(item => {
        const isActive = activeCategoryIds && item.categoryContent.id === activeCategoryIds[1];
        // let className = cssClassName('sub-menu-category-item ');
        // let activeClassName = cssClassName('navigation-level-two-link ', { 'active': isActive });

        return (
          <React.Fragment>
            {item.categoryContent.name && (
              <BodyCopy
                className="sub-category-item"
                component="li"
                fontFamily="secondary"
                key={item.categoryContent.id}
                id={`list-item-${item.categoryContent.id}`}
                role="none"
              >
                <Anchor href={item.url}>{item.categoryContent.name}</Anchor>
                {!isTopNav && isActive && (
                  <L3 menuItems={item.subCategories} activeCategoryIds={activeCategoryIds} />
                )}
              </BodyCopy>
            )}
          </React.Fragment>
        );
      })}
    </BodyCopy>
  );
}

function L3({ menuItems, activeCategoryIds }) {
  return (
    <BodyCopy
      component="ol"
      className="sub-menu-category sub-menu-category-level-three"
      role="none"
    >
      {menuItems.map(({ categoryContent: { name, categoryId }, url }) => {
        const isActive = activeCategoryIds && categoryId === activeCategoryIds[2];
        // let className = cssClassName('sub-menu-category-item navigation-level-three-item ');

        return (
          <React.Fragment>
            {
              <BodyCopy
                component="li"
                className={isActive}
                key={categoryId}
                id={`list-item-${categoryId}`}
                role="none"
              >
                <Anchor href={url}>{name}</Anchor>
              </BodyCopy>
            }
          </React.Fragment>
        );
      })}
    </BodyCopy>
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
