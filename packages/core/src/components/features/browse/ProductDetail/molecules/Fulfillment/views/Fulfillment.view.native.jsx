import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor, Button } from '@tcp/core/src/components/common/atoms/';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  Container,
  styles,
  FastShippingContainer,
  FastShippingTextContainer,
  StoreContainer,
  RowContainer,
  ColumnContainer,
  PromotionESpot,
  PromotionESpotLeftArrow,
  PromotionESpotTextContainer,
} from '../styles/Fulfillment.style.native';
import LineComp from '../../../../../../common/atoms/Line';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../../../../common/atoms/Icon/Icon.constants';

const Fulfillment = props => {
  const { onChangeStore, margins, onPickUpInStore } = props;
  return (
    <Container margins={margins}>
      <FastShippingContainer>
        <CustomIcon
          iconFontName={ICON_FONT_CLASS.Icomoon}
          name={ICON_NAME.fastShipping}
          size="fs25"
          color="gray.900"
          dataLocator="pdp_fast_shipping_icon"
        />
        <FastShippingTextContainer>
          <BodyCopy
            dataLocator="pdp_free_shipping_label"
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="semibold"
            color="gray.900"
            text="FREE Shipping Every Day!"
          />
          <BodyCopy
            dataLocator="pdp_free_shipping_label"
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="regular"
            color="gray.900"
            text="No Minimum Purchase Required."
          />
        </FastShippingTextContainer>
      </FastShippingContainer>
      <LineComp marginTop={16} borderColor="gray.1600" />
      <StoreContainer>
        <CustomIcon
          iconFontName={ICON_FONT_CLASS.Icomoon}
          name={ICON_NAME.markerIcon}
          size="fs24"
          color="gray.900"
          dataLocator="pdp_store_marker_icon"
        />
        <ColumnContainer margins="0 0 0 20px">
          <RowContainer>
            <BodyCopy
              margin="0 12px 0 0"
              dataLocator="pdp_store_name_value"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="semibold"
              color="gray.900"
              text="Dyckman Street"
            />
            <Anchor
              fontSizeVariation="medium"
              anchorVariation="custom"
              colorName="gray.900"
              underline
              href="#"
              locator="pdp_change_store_label"
              className="details-link"
              onPress={onChangeStore}
              text="(Change Store)"
            />
          </RowContainer>
          <RowContainer margins="4px 0 0 0px">
            <BodyCopy
              dataLocator="pdp_store_availability_label"
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="semibold"
              color="green.500"
              text="Limited Availability!"
            />
            <BodyCopy
              margin="0 0 0 4px"
              dataLocator="pdp_store_availability_value"
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              color="gray.900"
              text="Pick up today"
            />
          </RowContainer>
          <RowContainer margins="4px 0 0 0px">
            <BodyCopy
              dataLocator="pdp_store_no_rush_label"
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              color="gray.900"
              text="Or choose NO RUSH Pick Up"
            />
            <PromotionESpot>
              <PromotionESpotLeftArrow />
              <PromotionESpotTextContainer>
                <BodyCopy
                  dataLocator="pdp_store_no_rush_value"
                  fontFamily="primary"
                  fontSize="fs10"
                  fontWeight="black"
                  color="black"
                  text="EXTRA 5% OFF"
                />
              </PromotionESpotTextContainer>
            </PromotionESpot>
          </RowContainer>
        </ColumnContainer>
      </StoreContainer>
      <Button
        margin="12px 12px 0 12px"
        color="white"
        fill="BLACK"
        buttonVariation="variable-width"
        text="PICK UP IN STORE"
        fontSize="fs12"
        fontWeight="extrabold"
        fontFamily="secondary"
        onPress={onPickUpInStore}
        locator="pdp_pick_up_in_store_btn"
      />
    </Container>
  );
};

Fulfillment.propTypes = {
  props: PropTypes.shape({}).isRequired,
  onChangeStore: PropTypes.func,
  onPickUpInStore: PropTypes.func,
  labels: PropTypes.shape({}),
  margins: PropTypes.string,
};

Fulfillment.defaultProps = {
  labels: {},
  onChangeStore: () => {},
  margins: null,
  onPickUpInStore: () => {},
};

export default withStyles(Fulfillment, styles);
export { Fulfillment as FulfillmentVanilla };
