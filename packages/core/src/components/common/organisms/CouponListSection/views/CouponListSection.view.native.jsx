import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import {
  styles,
  WrapperStyle,
  PCContainer,
  TitleContainer,
  CardContainer,
  ShowMoreContainer,
  IconContainer,
  IconTextContainer,
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
              fontFamily="secondary"
              data-locator={dataLocator}
              text={`${heading} (${couponList.size})`}
            />
          )}
          {helpSubHeading && (
            <PCContainer>
              <IconContainer>
                <IconTextContainer>?</IconTextContainer>
              </IconContainer>
              <Anchor
                fontFamily="secondary"
                fontSizeVariation="small"
                underline
                anchorVariation="primary"
                onPress={this.helpAnchorClick}
                data-locator=""
                text={labels.HELP_APPLYING}
              />
            </PCContainer>
          )}
        </TitleContainer>

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
        <ShowMoreContainer>
          {couponList.size >= 5 && helpSubHeading !== undefined && (
            <Anchor
              fontSizeVariation="small"
              fontFamily="secondary"
              underline
              anchorVariation="primary"
              onPress={this.toggleShow}
              noLink
              to="/#"
              data-locator=""
              text={buttonText}
            />
          )}
        </ShowMoreContainer>
      </WrapperStyle>
    );
  }
}

CouponListSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  couponList: PropTypes.shape([]).isRequired,
  couponDetailClick: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  handleErrorCoupon: PropTypes.func.isRequired,
};

export default withStyles(CouponListSection, styles);
export { CouponListSection as CouponListSectionVanilla };
