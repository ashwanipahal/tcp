import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Row } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from './L3Panel.style';
import Drawer from '../Drawer';

const L3Panel = props => {
  const { id, hideL3Drawer, name, className, links, open, close } = props;

  return (
    <Drawer
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
      height="100%"
    >
      <div data-locator="overrlay_img" className={`${className} nav-bar-l3-panel`}>
        <div className="l3-panel-header">
          <span
            role="button"
            tabIndex={0}
            className="icon-back"
            onClick={hideL3Drawer}
            onKeyDown={hideL3Drawer}
          />
          <span className="l1-label l3-label">{name}</span>
        </div>
        <Row className="nav-bar-l3-details" tabIndex={0}>
          <ul>
            {links.map((l3Links, index) => {
              const {
                categoryContent: { name: l3Name, seoToken },
              } = l3Links;
              return (
                <li>
                  <Anchor to={`/c/${seoToken}`} data-locator={`l3_link_${index}`}>
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
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  links: PropTypes.shape([]).isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.bool.isRequired,
};

export { L3Panel as L3PanelVanilla };
export default withStyles(L3Panel, style);
