/* eslint-disable extra-rules/no-commented-out-code */
/**
 * Presentational component that renders a single entry of L1 navigation (such
 * as Girl, or Accessories) and it's associated L2 navigation.
 */

import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { Anchor } from '../../../../../../common/atoms';
import cssClassName from '../../utils/cssClassName';
import { getLocator } from '../../../../../../../utils/utils';
import errorBoundary from '../../../../../../common/hoc/withErrorBoundary';
import withStyles from '../../../../../../common/hoc/withStyles';
import GlobalNavigationMenuDesktopL2Styles from '../styles/GlobalNavigationMenuDesktopL2.style';

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
                  key={`column-${groups[0].groupName}`}
                  isLastGroup={index === menuGroupingArr.length - 1}
                  {...{ groups, activeCategoryIds, isTopNav, className }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(
  errorBoundary(GlobalNavigationMenuDesktopL2),
  GlobalNavigationMenuDesktopL2Styles
);

// This is a column
const NavGroupContainer = props => {
  const { groups, activeCategoryIds, isTopNav, isLastGroup, className } = props;

  const subMenuClassName = cssClassName({
    'sub-menu-group ': true,
    'navigation-level-two-item ': true,
    'last-group ': isLastGroup,
  });

  return (
    <div className={`${className} ${subMenuClassName}`}>
      {groups.map(({ menuItems, groupName }, index) => {
        const subMenuOutlinersclassName = cssClassName(
          'group-title ',
          `group-index-${index + 1} `,
          {
            'sub-menu-outliers-group ': groupName === '',
          }
        );
        return (
          <div key={`group-${groupName}`} className={`${className} ${subMenuOutlinersclassName}`}>
            <BodyCopy
              component="h2"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="extrabold"
              color="text.primary"
              data-locator={`${getLocator('plp_left_Nav_header')}`}
            >
              {groupName}
              {groupName && <p className="group-nav" />}
            </BodyCopy>
            <L2 {...{ menuItems, activeCategoryIds, isTopNav, className }} />
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

function asPathConstructor(url) {
  return url.replace('?cid=', '/');
}

function L2({ menuItems, activeCategoryIds, isTopNav, className }) {
  return (
    <BodyCopy
      component="ol"
      className="sub-menu-category sub-menu-wrapper"
      fontFamily="secondary"
      fontSize="fs14"
      color="text.primary"
      role="none"
    >
      {menuItems.map(item => {
        const isActive = activeCategoryIds && item.categoryContent.id === activeCategoryIds[1];
        // let className = cssClassName('sub-menu-category-item ');
        const activeClassName = cssClassName('navigation-level-two-link ', { active: isActive });

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
                <Anchor
                  className={activeClassName}
                  to={item.url}
                  asPath={asPathConstructor(item.url)}
                  data-locator={`${getLocator('plp_left_Nav_L2')}`}
                >
                  {item.categoryContent.name}
                </Anchor>
                {!isTopNav && isActive && (
                  <L3
                    menuItems={item.subCategories}
                    activeCategoryIds={activeCategoryIds}
                    className={className}
                  />
                )}
              </BodyCopy>
            )}
          </React.Fragment>
        );
      })}
    </BodyCopy>
  );
}

function L3({ menuItems, activeCategoryIds, className }) {
  return (
    <BodyCopy
      component="ol"
      className={`${className} sub-menu-category sub-menu-category-level-three`}
      role="none"
    >
      {menuItems.map(({ categoryContent: { name, categoryId, url } }) => {
        const isActive = activeCategoryIds && categoryId === activeCategoryIds[2];
        const navLevelThreeclassName = cssClassName(
          'sub-menu-category-item navigation-level-three-item '
        );

        return (
          <React.Fragment>
            {
              <BodyCopy
                component="li"
                className={
                  isActive
                    ? `${className} ${navLevelThreeclassName} active`
                    : `${className} ${navLevelThreeclassName} inactive`
                }
                key={categoryId}
                id={`list-item-${categoryId}`}
                role="none"
              >
                <Anchor
                  to={url}
                  asPath={asPathConstructor(url)}
                  data-locator={`${getLocator('plp_left_Nav_L3')}`}
                >
                  {name}
                </Anchor>
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
  className: PropTypes.string,
};

L2.defaultProps = {
  menuItems: [],
  activeCategoryIds: [],
  isTopNav: false,
  className: '',
};

L3.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({})),
  activeCategoryIds: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
};

L3.defaultProps = {
  menuItems: [],
  activeCategoryIds: [],
  className: '',
};
