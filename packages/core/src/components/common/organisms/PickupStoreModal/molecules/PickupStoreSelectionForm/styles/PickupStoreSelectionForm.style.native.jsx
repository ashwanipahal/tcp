import styled, { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const ModalTitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20;
`;

export const ModalTitle = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  color: ${props => props.theme.colorPalette.gray[900]};
  line-height: 16.8;
  font-weight: ${props => props.theme.typography.fontWeights.black};
`;

export const ModalCloseTouchable = styled.TouchableOpacity`
  position: absolute;
  right: 26;
`;

export const PickUpModalView = styled.View`
  padding: 20px 14px;
`;

export const PickUpHeaderText = styled.Text`
  flex-direction: row;
  align-items: flex-start;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 50px;
`;

export const Row = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const AddressCol = styled.View`
  width: 66%;
  margin-right: 4%;
  font-size: 13px;
  color: #1a1a1a;
`;
export const DistanceCol = styled.View`
  width: 30%;
  margin-top: 5px;
  font-size: 13px;
  color: #1a1a1a;
`;

export const dropDownStyle = {
  height: 23,
  border: 1,
};

export const itemStyle = {
  height: 23,
  paddingLeft: 6,
  color: 'black',
};

export default styles;
