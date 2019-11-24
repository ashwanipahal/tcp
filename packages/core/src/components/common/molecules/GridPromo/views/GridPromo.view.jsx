import React from 'react';
import PropTypes from 'prop-types';
import { Button, BodyCopy } from '../../../atoms';
import styles from '../styles/GridPromo.style';
import withStyles from '../../../hoc/withStyles';

const GridPromo = props => {
  const { className, promoObj: { textItems, subHeadLine } = {}, variation } = props;

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
      {headLineParts.map(line => {
        return (
          <BodyCopy color="black" fontFamily="secondary" fontSize="fs24" textAlign="center">
            {line}
          </BodyCopy>
        );
      })}
      <BodyCopy color="black" fontFamily="secondary" fontSize="fs24" textAlign="center">
        {textItems && textItems[1] && textItems[1].text}
      </BodyCopy>
      <BodyCopy color="black" fontFamily="secondary" fontSize="fs24" textAlign="center">
        {textItems && textItems[2] && textItems[2].text}
      </BodyCopy>
      {descriptionParts.map(description => {
        return (
          <BodyCopy color="black" fontFamily="secondary" fontSize="fs14" textAlign="center">
            {description}
          </BodyCopy>
        );
      })}
      <Button>SHOP NOW</Button>
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
