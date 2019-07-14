import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SignupFormIntroStyle from '../SignupFormIntro.style';

const SignupFormIntro = ({ className, formViewConfig }) => (
  <Fragment>
    <Col
      colSize={{ small: 4, medium: 6, large: 8 }}
      offsetLeft={{ small: 1, medium: 1, large: 2 }}
      ignoreGutter={{ large: true }}
      className={className}
    >
      <BodyCopy
        fontSize="fs18"
        fontFamily="secondary"
        textAlign="center"
        className="sign-up__label"
      >
        {formViewConfig.signUpForLabel}
      </BodyCopy>
      <BodyCopy
        fontSize="fs28"
        fontFamily="primary"
        fontWeight="black"
        textAlign="center"
        className="offer-type__label"
      >
        {formViewConfig.offerTypeLabel}
      </BodyCopy>
      <BodyCopy fontFamily="primary" className="flash-text" textAlign="center" component="div">
        <BodyCopy fontSize="fs48" component="span" className="get-text" color="primary.main">
          {formViewConfig.getTextLabel}
        </BodyCopy>
        <BodyCopy
          fontSize="fs36"
          component="span"
          fontWeight="black"
          className="dollar-text"
          color="primary.main"
        >
          {formViewConfig.dollarTextLabel}
        </BodyCopy>
        <BodyCopy
          fontSize="fs48"
          component="span"
          fontWeight="black"
          className="ten-text"
          color="primary.main"
        >
          {formViewConfig.tenTextLabel}
        </BodyCopy>
        <BodyCopy fontSize="fs48" textAlign="center" className="off-text" color="primary.main">
          {formViewConfig.offTextLabel}
        </BodyCopy>
      </BodyCopy>
      <BodyCopy fontSize="fs22" fontFamily="primary" fontWeight="semibold" textAlign="center">
        {formViewConfig.nextPurchaseLabel}
      </BodyCopy>
    </Col>
  </Fragment>
);

SignupFormIntro.propTypes = {
  formViewConfig: PropTypes.shape({}),
  className: PropTypes.string,
};

SignupFormIntro.defaultProps = {
  formViewConfig: {},
  className: '',
};

export { SignupFormIntro as SignupFormIntroVanilla };
export default withStyles(SignupFormIntro, SignupFormIntroStyle);
