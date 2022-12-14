import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, isCanada, routerPush } from '@tcp/core/src/utils';
import internalEndpoints from '@tcp/core/src/components/features/account/common/internalEndpoints';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/MiniBagHeader.style';

const getPointsColor = isPlcc => {
  if (isPlcc) {
    return 'blue.B100';
  }
  return 'orange.800';
};

class MiniBagHeader extends React.Component {
  onLinkClick = ({ e, componentId }) => {
    const { onRequestClose, openOverlay } = this.props;
    e.preventDefault();
    openOverlay({
      component: componentId,
      variation: 'primary',
    });
    onRequestClose();
  };

  /**
   * This function will handle click to go to respective links
   * @param {event, link, path} -
   */
  onLinkRedirect = ({ e, link, path }) => {
    e.preventDefault();
    routerPush(link, path);
  };

  render() {
    const {
      labels,
      cartItemCount,
      className,
      userName,
      currentPoints,
      totalRewards,
      isPlcc,
      isUserLoggedIn,
    } = this.props;

    const createAccount = 'createAccount';
    const login = 'login';
    const accountDrawer = 'accountDrawer';
    const isCA = isCanada();
    return (
      <div className={className}>
        <Row className="mainWrapper">
          <Col
            className={!userName ? 'subHeaderTextLogin' : 'subHeaderText'}
            colSize={{ small: 4, medium: 6, large: 9 }}
          >
            {!userName && !isUserLoggedIn ? (
              <BodyCopy component="span" fontSize="fs12" textAlign="left">
                <Anchor
                  fontSizeVariation="large"
                  anchorVariation="primary"
                  noLink
                  handleLinkClick={e => {
                    e.preventDefault();
                    this.onLinkClick({ e, componentId: createAccount });
                  }}
                >
                  {labels.createAccount}
                </Anchor>
                <BodyCopy component="span" fontSize="fs10" className="separator" />
                <Anchor
                  className="rightLink"
                  fontSizeVariation="large"
                  anchorVariation="primary"
                  noLink
                  handleLinkClick={e => this.onLinkClick({ e, componentId: login })}
                >
                  {labels.logIn}
                </Anchor>
              </BodyCopy>
            ) : (
              <>
                <BodyCopy
                  className={`userName ${isCA ? 'elem-pr-XL' : ''}`}
                  component="span"
                  fontSize="fs14"
                  fontWeight="extrabold"
                  textAlign="left"
                  fontFamily="secondary"
                  onClick={e => this.onLinkClick({ e, componentId: accountDrawer })}
                >
                  {`${labels.hi}, ${userName} `}
                </BodyCopy>
                {!isCA && (
                  <BodyCopy
                    className="pointsRewards"
                    color={getPointsColor(isPlcc)}
                    component="span"
                    fontSize="fs13"
                    fontFamily="secondary"
                    fontWeight="semibold"
                    textAlign="left"
                  >
                    {`(${currentPoints} ${labels.points}, $${parseFloat(totalRewards)} ${
                      labels.inRewards
                    })`}
                  </BodyCopy>
                )}
              </>
            )}
          </Col>
          <Col className="subHeaderTextIcon" colSize={{ small: 2, medium: 2, large: 3 }}>
            <Anchor
              className="favIcon"
              fontSizeVariation="small"
              anchorVariation="primary"
              noLink
              onClick={
                isUserLoggedIn
                  ? e =>
                      this.onLinkRedirect({
                        e,
                        link: internalEndpoints.favorites.link,
                        path: internalEndpoints.favorites.path,
                      })
                  : e => this.onLinkClick({ e, componentId: login })
              }
              title={labels.accessibility.favoriteIconButton}
            >
              <Image
                alt={labels.accessibility.favoriteIconButton}
                className="product-image"
                src={getIconPath('fav-icon')}
                dataLocator="addedtobag-fav-icon"
              />
            </Anchor>
            {'  '}
            <Image
              alt={labels.accessibility.cartIconButton}
              className="product-image"
              src={getIconPath(`cart-icon-${cartItemCount ? cartItemCount.toString().length : 1}`)}
              data-locator="addedtobag-bag-icon"
            />
            <BodyCopy
              className="cartCount"
              component="span"
              fontWeight="semibold"
              fontSize="fs10"
              dataLocator="miniBagCount"
            >
              {cartItemCount || 0}
            </BodyCopy>
          </Col>
        </Row>
      </div>
    );
  }
}

MiniBagHeader.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  cartItemCount: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  currentPoints: PropTypes.string.isRequired,
  totalRewards: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  openOverlay: PropTypes.func.isRequired,
  isPlcc: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default withStyles(MiniBagHeader, styles);
export { MiniBagHeader as MiniBagHeaderVanilla };
