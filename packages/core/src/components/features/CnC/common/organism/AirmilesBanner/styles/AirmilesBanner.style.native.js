import styled from 'styled-components/native';

const AirmilesBannerFormContainer = styled.View`
  display: flex;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  background-color: ${props => props.theme.colors.WHITE};
  align-items: center;
`;

const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  margin: 0px;
  margin-bottom: 18px;
  align-items: flex-end;
`;

const InputField = styled.View`
  flex: 1;
  flex-direction: row;
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const InputContainer = styled.View`
  flex: 1;
`;

const IconContainer = styled.View`
  position: absolute;
  right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export { AirmilesBannerFormContainer, FlexRow, Header, InputField, IconContainer, InputContainer };
