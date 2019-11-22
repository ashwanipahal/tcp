import styled from 'styled-components/native';

const CardViewWrapper = styled.View`
  display: flex;
  flex-direction: row;
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  height: 180px;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const CardDetailView = styled.View`
  height: 150px;
  display: flex;
  width: 60%;
`;

const CardImageView = styled.View`
  height: 150px;
  display: flex;
  width: 35%;
  justify-content: flex-start;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const StyledHeading = styled.Text`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export { CardViewWrapper, StyledHeading, CardDetailView, CardImageView };
