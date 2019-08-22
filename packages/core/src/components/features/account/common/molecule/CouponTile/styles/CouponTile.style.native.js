import styled from 'styled-components/native';

const CouponTileSection = styled.View`
  flex: 1;
  justify-content: flex-start;
  margin: 10px 0px;
`;

const CouponInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 9px;
`;

const CouponWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  justify-content: flex-start;
`;

const CouponReward = styled.View`
  justify-content: center;
  align-items: center;
  height: 42px;
  width: 91px;
  background-color: ${props => props.theme.colorPalette.orange[800]};
`;

export { CouponTileSection, CouponWrapper, CouponInfo, CouponReward };
