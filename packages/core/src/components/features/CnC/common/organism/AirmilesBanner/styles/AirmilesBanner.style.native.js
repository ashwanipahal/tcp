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
  display: flex;
  flex: 1;
  padding-right: 8px;
`;

export { AirmilesBannerFormContainer, FlexRow, Header, InputField };
