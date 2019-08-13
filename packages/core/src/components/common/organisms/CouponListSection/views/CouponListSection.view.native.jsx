import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import withStyles from '../../../hoc/withStyles';
import {
  styles,
  WrapperStyle,
  PCContainer,
  TitleContainer,
  CardContainer,
  ModalContainer,
} from '../styles/CouponListSection.style.native';
import BodyCopy from '../../../atoms/BodyCopy';
import Anchor from '../../../atoms/Anchor';
import CouponCard from '../../../molecules/CouponCard';

export class CouponListSection extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  toggleShow = event => {
    event.preventDefault();
    this.setState(prevState => ({
      showMore: !prevState.showMore,
    }));
  };

  helpAnchorClick = event => {
    event.preventDefault();
    const { helpAnchorClick } = this.props;
    helpAnchorClick();
  };

  render() {
    const {
      labels,
      isFetching,
      couponList,
      className,
      heading,
      helpSubHeading,
      couponDetailClick,
      onApply,
      onRemove,
      dataLocator,
      handleErrorCoupon,
    } = this.props;
    const { showMore } = this.state;
    const buttonText =
      showMore === true ? labels.LESS_MORE_BUTTON_TEXT : labels.SHOW_MORE_BUTTON_TEXT;
    const couponListFilter = showMore === true ? couponList : couponList.slice(0, 5);
    return (
      <WrapperStyle>
        <TitleContainer>
          {couponList.size > 0 && (
            <BodyCopy
              fontSize="fs16"
              fontWeight="semibold"
              data-locator=""
              text={`${heading} (${couponList.size})`}
            />
          )}
        </TitleContainer>
        {this.helpSubHeading && (
          <PCContainer>
            <Text>?</Text>
            <Anchor
              fontSizeVariation="small"
              underline
              anchorVariation="primary"
              handleLinkClick={this.helpAnchorClick}
              data-locator=""
              text={labels.HELP_APPLYING}
            />
          </PCContainer>
        )}
        <CardContainer>
          {couponListFilter.map(coupon => {
            return (
              <CouponCard
                key={coupon.id}
                labels={labels}
                isFetching={isFetching}
                coupon={coupon}
                couponDetailClick={couponDetailClick}
                onApply={onApply}
                onRemove={onRemove}
                handleErrorCoupon={handleErrorCoupon}
              />
            );
          })}
        </CardContainer>
        <ModalContainer>
          {this.helpSubHeading && (
            <Anchor
              fontSizeVariation="small"
              underline
              anchorVariation="primary"
              handleLinkClick={this.toggleShow}
              data-locator=""
              text={buttonText}
            />
          )}
        </ModalContainer>
      </WrapperStyle>
    );
  }
}

CouponListSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(CouponListSection, styles);
export { CouponListSection as CouponListSectionVanilla };
