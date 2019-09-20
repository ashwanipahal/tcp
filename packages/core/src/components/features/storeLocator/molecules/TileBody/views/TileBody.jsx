import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Row, Col, Anchor, BodyCopy, Image, Button } from '../../../../../common/atoms';
import style from '../styles/TileBody.style.js';
import { toTimeString, getIconPath } from '../../../../../../utils';
import { parseDate } from '../../../../../../utils/parseDate';

export const TileAddressSection = ({ store }) => {
  const { address, phone } = store.basicInfo;
  const { addressLine1, city, state, zipCode } = address;
  return (
    <BodyCopy fontSize="fs12" component="div" color="text.primary" fontFamily="secondary">
      {[addressLine1, `${city}, ${state}, ${zipCode}`, phone].map((item, i) => (
        <BodyCopy component="div">{item}</BodyCopy>
      ))}
    </BodyCopy>
  );
};

export const TileFavoriteSection = ({ isFavoriteStore, onSetAsFavorite, labels }) => {
  return isFavoriteStore ? (
    <BodyCopy component="div">
      <Image src={getIconPath('fav-store')} alt="Favorite Store" title="Favorite Store" />
      <BodyCopy component="div">{labels.lbl_storelocators_landingpage_favStore}</BodyCopy>
    </BodyCopy>
  ) : (
    <Button
      onClick={onSetAsFavorite}
      buttonVariation="fixed-width"
      type="button"
      data-locator="addnewaddress-cancel"
    >
      {labels.lbl_storelocators_landingpage_setfavStore}
    </Button>
  );
};

const BrandStoreLocatorIcon = ({ labels }) => {
  const gymIcon = getIconPath('gymboree-icon');

  return (
    <BodyCopy
      fontSize="fs12"
      component="div"
      color="text.primary"
      fontFamily="secondary"
      className="store__tile__brandicon"
    >
      <Image
        src={gymIcon}
        alt="Gymboree"
        title="Gymboree Store"
        className="store__tile__brandicon__image"
      />
      <BodyCopy component="span">{labels.lbl_storelocators_common_atThisPlace}</BodyCopy>
    </BodyCopy>
  );
};

const TileBody = props => {
  const {
    store,
    storeIndex,
    openStoreDetail,
    showGymboreeStore,
    labels,
    isFavoriteStore,
    onSetAsFavorite,
    className,
  } = props;

  return (
    <BodyCopy component="div" className={className}>
      <Row fullBleed className="storetile__storeaddress__section">
        <Col colSize={{ large: 4, medium: 8, small: 6 }}>
          <TileAddressSection store={store} />
        </Col>
        <Col colSize={{ large: 4, medium: 8, small: 6 }}>
          {showGymboreeStore ? <BrandStoreLocatorIcon labels={labels} /> : null}
        </Col>
      </Row>
      <Row fullBleed className="storetile__action__links">
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <Anchor
            fontSizeVariation="medium"
            underline
            handleLinkClick={openStoreDetail}
            anchorVariation="primary"
            target="_blank"
            className=" get__directions__link"
          >
            {labels.lbl_storelocators_landingpage_storedetails_link}
          </Anchor>
        </Col>
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <TileFavoriteSection
            isFavoriteStore={isFavoriteStore}
            onSetAsFavorite={onSetAsFavorite}
            labels={labels}
          />
        </Col>
      </Row>
    </BodyCopy>
  );
};

TileBody.propTypes = {};

TileBody.defaultProps = {};

export default withStyles(TileBody, style);
