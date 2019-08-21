import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getViewportInfo } from '@tcp/core/src/utils';
import PromoBadge from '../PromoBadge';
import style from './L1NavItem.style';

/**
 * This function handles if navigation drawer needs to open on current viewport or now
 * @param {*} onClick
 */
const openNavigationDrawer = onClick => e => {
  if (!getViewportInfo().isDesktop) {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }
};

/**
 * This function generate URL for the link
 * @param {*} seoUrl This parameter takes the highest priority
 * @param {*} seoToken This parameter is appended to form url in format "/c/{seoToken}" and takes 2nd priority
 * @param {*} catgroupId This parameter is appended to form url in format "/c/{catgroupId}" and takes last priority
 */
const generateUrl = (seoUrl, seoToken, catgroupId) => {
  return (
    seoUrl ||
    `/${
      seoToken.startsWith('content-')
        ? seoToken.replace(new RegExp('content-', 'g'), 'content/')
        : `c/${seoToken || catgroupId}`
    }`
  );
};

const highlightContent = id => {
  return id === '505518' || id === '454010' ? `highlighted` : ``;
};

class L1NavItem extends React.PureComponent {
  state = {
    hovered: false,
  };

  onHover = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      hovered: true,
    });
  };

  onMouseLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      hovered: false,
    });
  };

  fetchPromoBadge() {
    const {
      categoryContent: { mainCategory },
    } = this.props;
    return mainCategory && mainCategory.promoBadge;
  }

  render() {
    const {
      categoryContent: { id, name, description, mainCategory, seoUrl, seoToken, catgroupId },
      className,
      dataLocator,
      index,
      children,
      onClick,
      showOnlyOnApp,
      removeL1Focus,
      ...others
    } = this.props;

    const { hovered } = this.state;

    let classForHovered = '';
    if (hovered && !removeL1Focus) {
      classForHovered = 'is-open';
    }

    const classToShowOnlyOnApp = showOnlyOnApp ? `show-on-mobile` : ``;
    const classForRedContent = highlightContent(id);
    const promoBadge = this.fetchPromoBadge(mainCategory);
    const url = generateUrl(seoUrl, seoToken, catgroupId);

    return (
      <React.Fragment>
        <BodyCopy
          component="li"
          className={`${className} ${classForHovered} nav-bar-l1-item ${classToShowOnlyOnApp}`}
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
          <Anchor to={url} onClick={openNavigationDrawer(onClick)}>
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
          {children}
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
  showOnlyOnApp: PropTypes.bool.isRequired,
  removeL1Focus: PropTypes.bool.isRequired,
};

L1NavItem.defaultProps = {
  dataLocator: '',
};

export { L1NavItem as L1NavItemVanilla };
export default withStyles(L1NavItem, style);
