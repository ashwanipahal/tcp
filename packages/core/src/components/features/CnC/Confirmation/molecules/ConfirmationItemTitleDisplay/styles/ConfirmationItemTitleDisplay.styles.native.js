import styled from 'styled-components/native';
import Anchor from '../../../../../../common/atoms/Anchor';

export const CustomIconWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const LabelContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
export const AddressPopUpWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IconContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
  top: -10px;
`;

export const AnchorWrapper = styled(Anchor)`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  font-size: ${props => props.theme.typography.fontSizes.fs18};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
`;

export const LocationContainer = styled.View``;

export const Container = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.XXS} 0;
`;

export const italicStyle = {
  fontStyle: 'italic',
};
export const AddressHeaderWrapper = styled.Text`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const LocationContainerWrapper = styled.View``;

export default {
  CustomIconWrapper,
  LabelContainer,
  IconContainer,
  LocationContainer,
  AnchorWrapper,
  Container,
  italicStyle,
  AddressHeaderWrapper,
  LocationContainerWrapper,
  AddressPopUpWrapper,
};
