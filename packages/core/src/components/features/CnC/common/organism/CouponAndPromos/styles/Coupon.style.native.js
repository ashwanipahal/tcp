import styled, { css } from 'styled-components';

const styles = css`
  .coupon_list {
    margin-top: 0px;
  }
`;

const WrapperStyle = styled.View``;

const CouponListContainer = styled.View`
  background-color: rgba(243, 243, 243, 1);
  padding: 20px 0px 20px 0px;
`;

const StyledHeader = styled.View`
  padding-left: 14px;
`;

export { styles, WrapperStyle, CouponListContainer, StyledHeader };
