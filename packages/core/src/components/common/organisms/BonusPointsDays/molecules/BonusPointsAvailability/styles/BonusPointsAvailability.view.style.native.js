import styled from 'styled-components/native';

const BtnWrapper = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MarginRightWrapper = styled.View`
  margin-right: ${props => (props.bonusLength === 1 ? 0 : props.theme.spacing.ELEM_SPACING.LRG)};
`;

export { BtnWrapper, MarginRightWrapper };
