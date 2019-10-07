import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Row } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from './L3Panel.style';
import Drawer from '../Drawer';
import { keyboard } from '../../../../../../constants/constants';
import mock from './mock';

const keydownHideL3Drawer = (e, hideL3Drawer) => {
  const { KEY_ENTER, KEY_SPACE } = keyboard;
  if (e.which === KEY_ENTER || e.which === KEY_SPACE) {
    hideL3Drawer();
  }
};

const L3Panel = props => {
  const {
    id,
    hideL3Drawer,
    hideL2Drawer,
    closeNav,
    name,
    className,
    links,
    open,
    close,
    accessibilityLabels: { previousButton },
  } = props;

  return (
    <Drawer
      className={className}
      id={id}
      small
      medium
      large
      open={open}
      close={close}
      width={{
        small: '314px',
        medium: '314px',
        large: '100%',
      }}
      position={{
        top: 0,
        left: 0,
      }}
      height="100%"
    >
      <div data-locator="overrlay_img" className={`${className} nav-bar-l3-panel`}>
        <div className="l3-panel-header">
          <span
            role="button"
            aria-label={previousButton}
            tabIndex={0}
            className="icon-back"
            onClick={hideL3Drawer}
            onKeyDown={e => keydownHideL3Drawer(e, hideL3Drawer)}
          />
          <span className="l1-label l3-label">{name}</span>
        </div>
        <Row className="nav-bar-l3-details" tabIndex={0}>
          <ul>
            <li>
              <Anchor to="/c" data-locator="l3_link_shop_all">
                <BodyCopy
                  className="l2-nav-link"
                  fontFamily="secondary"
                  fontSize={['fs13', 'fs13', 'fs14']}
                  lineHeight="lh107"
                  color="text.primary"
                >
                  <span className="nav-bar-item-label full-width">{mock.shopAllLabel}</span>
                </BodyCopy>
              </Anchor>
            </li>
            {links.map((l3Links, index) => {
              const {
                categoryContent: { name: l3Name },
                url,
                asPath,
              } = l3Links;
              return (
                <li>
                  <Anchor
                    to={url}
                    asPath={asPath}
                    onClick={e => {
                      hideL3Drawer(e);
                      hideL2Drawer(e, true);
                      closeNav();
                    }}
                    dataLocator={`l3_link_${index}`}
                  >
                    <BodyCopy
                      className="l2-nav-link"
                      fontFamily="secondary"
                      fontSize={['fs13', 'fs13', 'fs14']}
                      lineHeight="lh107"
                      color="text.primary"
                    >
                      <span className="nav-bar-item-label full-width">{l3Name}</span>
                    </BodyCopy>
                  </Anchor>
                </li>
              );
            })}
          </ul>
        </Row>
      </div>
    </Drawer>
  );
};

L3Panel.propTypes = {
  id: PropTypes.string.isRequired,
  hideL3Drawer: PropTypes.func.isRequired,
  hideL2Drawer: PropTypes.func.isRequired,
  closeNav: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  links: PropTypes.shape([]).isRequired,
  accessibilityLabels: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.bool.isRequired,
};

export { L3Panel as L3PanelVanilla };
export default withStyles(L3Panel, style);
