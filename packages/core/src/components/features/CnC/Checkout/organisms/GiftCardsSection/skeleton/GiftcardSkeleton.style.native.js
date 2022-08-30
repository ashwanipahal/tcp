import styled from 'styled-components/native';

const ParentWrapper = styled.View`
  border: 2px solid ${props => props.theme.colorPalette.gray[300]};
  margin-top: 10px;
`;

const PricePointsWrapper = styled.View`
  padding: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const PriceSubText = styled.View`
  width: 140px;
  height: 20px;
`;

const PriceSubValue = styled.View`
  width: 80px;
  height: 20px;
`;

export { PricePointsWrapper, PriceSubText, PriceSubValue, ParentWrapper };
