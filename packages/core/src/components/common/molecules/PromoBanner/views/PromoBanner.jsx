import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy } from '../../../atoms';
import errorBoundary from '../../../hoc/withErrorBoundary';
import LinkText from '../../LinkText';
import withStyles from '../../../hoc/withStyles';
import PromoBannerStyle from '../PromoBanner.style';
import { configureInternalNavigationFromCMSUrl } from '../../../../../utils';

/**
 * Currency & Up variation of Promo Banner
 * @param {*} props
 */
const renderCurrencyUpVariation = (style, text) => {
  const textItems = text.split(' ');

  return (
    <BodyCopy component="div" className={`promo-text ${style}`} fontFamily="primary">
      <div className="col-1">
        <span className={`${style}-0`}>{textItems[0]}</span>
        <span className={`${style}-1`}>{textItems[1]}</span>
      </div>
      <div className="col-2">
        <span className={`${style}-2`}>{textItems[2]}</span>
        <span className={`${style}-3`}>{`${textItems[3]}${textItems[4]}`}</span>
      </div>
    </BodyCopy>
  );
};

/**
 * This component produces a Promo Text banner
 * Expects textItems array consisting of objects in below format
 * {
 *    style: "",
 *    text: ""
 * }
 * This component uses BodyCopy atom and accepts all properties of BodyCopy
 * @param {*} props
 */
const PromoBanner = props => {
  const {
    headerText,
    promoBanner: [{ textItems, link }],
    className,
    dataLocatorHeader,
    ...otherProps
  } = props;

  const navigationUrl = link;
  navigationUrl.to = configureInternalNavigationFromCMSUrl(link.url);
  navigationUrl.asPath = link.url;

  return (
    <BodyCopy component="div" className={className} {...otherProps}>
      <React.Fragment>
        {headerText && (
          <LinkText
            component="div"
            dataLocator={dataLocatorHeader}
            className="promo-banner-header"
            fontFamily="primary"
            headerText={headerText}
          />
        )}
        <Anchor {...navigationUrl} className="promo-text-link">
          {textItems.map(({ text, style }, index) => {
            let promoText;

            /* this need to be fixed once we have 5 items for module A or unlimited textItems creation in CMS */
            if (
              style === 'percentage_wrapped_extra_large' ||
              style === 'percentage_wrapped_large' ||
              style === 'percentage_all_wrapped_normal'
            ) {
              const percentageTexts = text.split(' ');
              promoText = (
                <div className={`promo-text ${style}`}>
                  <span className={`${style}-0`}>
                    {percentageTexts[0] && percentageTexts[0].trim()}
                  </span>
                  <span className={`${style}-1`}>% </span>
                  <span className={`${style}-2`}>
                    {percentageTexts[2] && percentageTexts[2].trim()}
                  </span>
                </div>
              );
            } else if (style === 'currency_up_style' || style === 'style10') {
              promoText = renderCurrencyUpVariation(style, text);
            } else {
              promoText = (
                <span className={`promo-text ${style}`}>{index ? ` ${text}` : text}</span>
              );
            }

            return promoText;
          })}
        </Anchor>
      </React.Fragment>
    </BodyCopy>
  );
};

PromoBanner.propTypes = {
  promoBanner: PropTypes.arrayOf(
    PropTypes.oneOfType(
      PropTypes.shape({
        textItems: PropTypes.arrayOf(
          PropTypes.oneOfType(
            PropTypes.shape({
              style: PropTypes.string,
              text: PropTypes.string,
            })
          )
        ),
      })
    )
  ).isRequired,
  className: PropTypes.string.isRequired,
  dataLocatorHeader: PropTypes.string,
  headerText: PropTypes.arrayOf(
    PropTypes.oneOfType(
      PropTypes.shape({
        textItems: PropTypes.arrayOf(
          PropTypes.oneOfType(
            PropTypes.shape({
              style: PropTypes.string,
              text: PropTypes.string,
            })
          )
        ),
        link: PropTypes.shape({
          url: PropTypes.string,
          text: PropTypes.string,
          target: PropTypes.string,
          title: PropTypes.string,
        }),
      })
    )
  ),
};

PromoBanner.defaultProps = {
  headerText: '',
  dataLocatorHeader: '',
};

export { PromoBanner as PromoBannerVanilla };
export default withStyles(errorBoundary(PromoBanner), PromoBannerStyle);
