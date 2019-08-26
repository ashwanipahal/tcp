import React from 'react';
import 'core-js/stable/array/includes';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getViewportInfo } from '@tcp/core/src/utils';
import PromoBadge from '../PromoBadge';
import style from './L1NavItem.style';

/**
 * This function highlights clearance links in red color on the base of id in unbxd
 * @param {*} id
 */
const highlightContent = id => {
  return id === '505518' || id === '454010' ? `highlighted` : ``;
};

class L1NavItem extends React.PureComponent {
  state = {
    hovered: false,
  };

  onHover = e => {
    if (getViewportInfo().isDesktop) {
      this.setState({
        hovered: !e.target.classList.contains('l1-overlay'),
      });
    }
  };

  onMouseLeave = () => {
    if (getViewportInfo().isDesktop) {
      this.setState({
        hovered: false,
      });
    }
  };

  /**
   * This function handles if navigation drawer needs to open on current viewport or now
   * @param {*} onClick
   */
  openNavigationDrawer = e => {
    const { onClick } = this.props;
    if (!getViewportInfo().isDesktop) {
      e.preventDefault();
      e.stopPropagation();
      this.setState(
        {
          hovered: true,
        },
        () => {
          onClick();
        }
      );
    }
  };

  fetchPromoBadge() {
    const {
      categoryContent: { mainCategory },
    } = this.props;
    return mainCategory && mainCategory.promoBadge;
  }

  render() {
    const {
      categoryContent: { id, name, description, mainCategory, url },
      className,
      dataLocator,
      index,
      children,
      // showOnlyOnApp,
      removeL1Focus,
      ...others
    } = this.props;

    const { hovered } = this.state;

    let classForHovered = '';
    if (hovered && !removeL1Focus) {
      classForHovered = 'is-open';
      this.childRendered = true;
    }

    // If we receive flag showOnlyOnApp then we add this class to links to hide them
    // const classToShowOnlyOnApp = showOnlyOnApp ? `show-on-mobile` : ``;

    // This class is used to highlight link in red color, it performs check based on id
    const classForRedContent = highlightContent(id);
    // This function renders promoBadge
    const promoBadge = this.fetchPromoBadge(mainCategory);

    return (
      <React.Fragment>
        <BodyCopy
          component="li"
          // className={`${className} ${classForHovered} nav-bar-l1-item ${classToShowOnlyOnApp}`}
          className={`${className} ${classForHovered} nav-bar-l1-item`}
          fontFamily="secondary"
          fontSize={['fs13', 'fs13', 'fs15']}
          fontWeight="semibold"
          color="text.hint"
          lineHeight="lh115"
          data-locator={dataLocator}
          tabIndex={0}
          onMouseOver={this.onHover}
          onFocus={this.onHover}
          onMouseOut={this.onMouseLeave}
          onBlur={this.onMouseLeave}
          {...others}
        >
          <Anchor to={url} onClick={this.openNavigationDrawer}>
            <div className="nav-bar-l1-content" role="button" tabIndex={0}>
              <span className={`nav-bar-item-label ${classForRedContent}`}>{name}</span>
              <span
                className={`nav-bar-item-content ${description ? 'nav-bar-item-sizes-range' : ''}`}
                data-locator={description ? `sizesrange_label_${index}` : `promo_badge_${index}`}
              >
                {description || (promoBadge && <PromoBadge data={promoBadge} />) || ``}
              </span>
              <span className="icon-arrow" />
            </div>
          </Anchor>
          {(hovered || this.childRendered) && children}
          <div className={`${className} l1-overlay ${classForHovered}`} />
        </BodyCopy>
      </React.Fragment>
    );
  }
}

L1NavItem.propTypes = {
  categoryContent: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  dataLocator: PropTypes.string,
  index: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  // showOnlyOnApp: PropTypes.bool.isRequired,
  removeL1Focus: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};

L1NavItem.defaultProps = {
  dataLocator: '',
};

export { L1NavItem as L1NavItemVanilla };
export default withStyles(L1NavItem, style);
