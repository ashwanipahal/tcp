import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image, Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/PromoListTile.style';

/**
 * This class component returns the Extra Points Promo List Tiles
 * can be passed in the component.
 * @param tileData - tileData object used for showing extra points details
 */
export class PromoListTile extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    tileData: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    className: '',
  };

  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { className, tileData } = this.props;
    return (
      <BodyCopy component="div" className={className}>
        <BodyCopy className="border-padding">
          <Row className="image">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Image
                alt={tileData.image.alt}
                className="tileImage"
                src={tileData.image.url}
                data-locator="earnpoints-image"
              />
            </Col>
          </Row>
          <BodyCopy
            component="p"
            fontSize="fs16"
            fontWeight="black"
            fontFamily="secondary"
            textAlign="center"
            data-locator="earnExtraPointsTileHeadline"
          >
            {tileData.headLine[0].text}
          </BodyCopy>
          <BodyCopy
            component="p"
            fontSize="fs16"
            fontWeight="regular"
            fontFamily="secondary"
            textAlign="center"
            data-locator="earnExtraPointsTilSubHeadline"
          >
            {tileData.subHeadLine[0].text}
          </BodyCopy>
          {tileData.buttonList && (
            <BodyCopy textAlign="center" className="tile-anchor">
              <Anchor
                underline
                noLink
                to={tileData.buttonList[0].url}
                fontSizeVariation="large"
                data-locator="privacyLnk"
              >
                {tileData.buttonList[0].text}
              </Anchor>
            </BodyCopy>
          )}
        </BodyCopy>
      </BodyCopy>
    );
  }
}

export default withStyles(PromoListTile, styles);
export { PromoListTile as PromoListTileVanilla };
