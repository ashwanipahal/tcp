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
  margin-left: 10px;
  margin-right: 10px;
`;

export { styles, WrapperStyle, CouponListContainer, StyledHeader };
