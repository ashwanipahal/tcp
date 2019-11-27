import React from 'react';
import PropTypes from 'prop-types';
import { Button, BodyCopy, Anchor } from '../../../atoms';
import styles from '../styles/GridPromo.style';
import withStyles from '../../../hoc/withStyles';

const GridPromo = props => {
  const {
    className,
    promoObj,
    promoObj: { textItems, subHeadLine, promoWrapper } = {},
    variation,
  } = props;
  console.log('promoObj', promoObj);

  const headingLine = textItems[0] && textItems[0].text;
  const headLineParts = headingLine.split('|');

  const descriptionLine = subHeadLine && subHeadLine[0] && subHeadLine[0].text;
  const descriptionParts = descriptionLine.split('|');

  if (variation === 'horizontal') {
    return (
      <div className={`${className} horizontal-promo`}>
        {headLineParts.map(line => {
          return (
            <BodyCopy color="black" fontFamily="secondary" fontSize="fs24" textAlign="center">
              {line}
            </BodyCopy>
          );
        })}
      </div>
    );
  }
  return (
    <div className={`${className} product-tile promo-div`}>
      <div className="headline-wrapper">
        {headLineParts.map(line => {
          return (
            <>
              <BodyCopy
                Component="span"
                className={`${className} highlighted-text`}
                color="black"
                fontFamily="secondary"
                fontSize="fs36"
                fontWeight="black"
                textAlign="center"
              >
                {line}
              </BodyCopy>
              <br />
            </>
          );
        })}
      </div>
      <div className="middle-text-wrapper">
        <BodyCopy color="white" fontFamily="secondary" fontSize="fs24" textAlign="center">
          {textItems && textItems[1] && textItems[1].text}
        </BodyCopy>
        <BodyCopy
          color="white"
          fontFamily="secondary"
          fontSize="fs24"
          fontWeight="black"
          textAlign="center"
        >
          {textItems && textItems[2] && textItems[2].text}
        </BodyCopy>
      </div>
      <div className="description-wrapper">
        {descriptionParts.map(description => {
          return (
            <BodyCopy color="white" fontFamily="secondary" fontSize="fs12" textAlign="center">
              {description}
            </BodyCopy>
          );
        })}
      </div>
      <div className="cta-wrapper">
        {promoWrapper.map(cta => {
          if (cta.type === 'button') {
            return (
              <Button buttonVariation="variable-width" fill="BLUE">
                {cta.text}
              </Button>
            );
          }
          return (
            <Anchor
              to={cta.url}
              asPath={cta.url}
              target={cta.target}
              title={cta.title}
              anchorVariation="white"
            >
              {cta.text}
            </Anchor>
          );
        })}
      </div>
    </div>
  );
};

GridPromo.propTypes = {
  className: PropTypes.string,
  promoObj: PropTypes.shape({
    textItems: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ).isRequired,
    subHeadLine: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ),
    promoWrapper: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ),
    mediaWrapper: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ),
  }).isRequired,
  variation: PropTypes.string,
};

GridPromo.defaultProps = {
  className: '',
  variation: 'vertical',
};

export default withStyles(GridPromo, styles);
export { GridPromo as GridPromoVanilla };
