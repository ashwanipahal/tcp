import React from 'react';
import PropTypes from 'prop-types';
import { ButtonList } from '../..';
import style from '../ModuleN.style';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import { getLocator } from '../../../../../utils';
import withStyles from '../../../hoc/withStyles';
import { Row, Col } from '../../../atoms';
import config from '../ModuleN.config';
import errorBoundary from '../../../hoc/withErrorBoundary';

const { ctaTypes } = config;

const ModuleN = props => {
  const { className, ctaItems, headerText, promoBanner, set } = props;

  const ctaType = ctaTypes[set[2].val];

  return (
    <Row className={`${className} moduleN`} fullBleed={{ small: true, medium: true, large: true }}>
      <Col
        colSize={{
          small: 6,
          medium: 8,
          large: 12,
        }}
      >
        <div className="heading-wrapper">
          {headerText && (
            <LinkText
              headerText={headerText}
              component="h3"
              textAlign="center"
              type="heading"
              color="white"
              className="ModuleN-heading"
              data-locator={getLocator('moduleN_header_text')}
            />
          )}
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              className="moduleN__promo-banner"
              color="white"
              data-locator={getLocator('moduleN_promobanner_text')}
            />
          )}
        </div>
        <ButtonList
          buttonListVariation={ctaType}
          buttonsData={ctaItems}
          fill="RED"
          dataLocatorDivisionImages={getLocator('moduleN_image')}
          dataLocatorTextCta={getLocator('moduleN_cta_links')}
        />
      </Col>
    </Row>
  );
};

ModuleN.defaultProps = {
  className: '',
  ctaItems: [],
  headerText: [],
  promoBanner: [],
  set: [],
};

ModuleN.propTypes = {
  className: PropTypes.string,
  ctaItems: PropTypes.arrayOf(PropTypes.shape({})),
  headerText: PropTypes.arrayOf(PropTypes.shape({})),
  promoBanner: PropTypes.arrayOf(PropTypes.shape({})),
  set: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withStyles(errorBoundary(ModuleN), style);
export { ModuleN as ModuleNVanilla };
