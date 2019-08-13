import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/BagPage/organisms/OrderLedger';
import CouponAndPromos from '../../common/organism/CouponAndPromos';
import {
  WrapperStyle,
  HeadingViewStyle,
  MainSection,
  RowSectionStyle,
  HeadingTextStyle,
} from '../styles/BagPage.style.native';

const BagPage = ({ labels, totalCount }) => {
  return (
    <ScrollView>
      <HeadingViewStyle>
        <HeadingTextStyle>{`${labels.bagHeading} (${totalCount})`}</HeadingTextStyle>
      </HeadingViewStyle>
      <MainSection>
        <RowSectionStyle>
          <OrderLedgerContainer />
        </RowSectionStyle>
        <RowSectionStyle>
          <CouponAndPromos />
        </RowSectionStyle>
      </MainSection>
    </ScrollView>
  );
};

BagPage.propTypes = {
  labels: PropTypes.shape.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default BagPage;
