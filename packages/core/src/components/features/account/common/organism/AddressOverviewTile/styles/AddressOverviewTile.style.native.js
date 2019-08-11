import styled from 'styled-components/native';

const UnderlineStyle = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const AddressTileContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[700]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ButtonWrapperStyle = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const TouchableLink = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const AddressTypeContainer = styled.View`
  height: 24px;
  flex: 1;
  flex-direction: row;
`;

const BodyCopyStyle = {
  fontSize: 'fs13',
};

const LeftContainer = {
  flex: 1.5,
  flexDirection: 'row',
  justifyContent: 'flex-start',
};

const RightContainer = {
  flex: 0.5,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

export {
  UnderlineStyle,
  AddressTileContainer,
  ButtonWrapperStyle,
  TouchableLink,
  BodyCopyStyle,
  AddressTypeContainer,
  LeftContainer,
  RightContainer,
};
