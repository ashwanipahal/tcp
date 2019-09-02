import styled from 'styled-components/native';

const StyledWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[700]};
`;

const StyledLabeledRadioBtn = styled.View`
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[700]};
  width: 100%;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
  flex-direction: row;
  justify-content: flex-start;
`;
const StyledHeaderBtnWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;
const StyledBopisBorder = styled.View`
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[700]};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
  height: 50px;
`;

const StyledText = styled.Text`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const StyledStoreText = styled.Text`
  color: ${props => props.theme.colorPalette.primary.main};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
`;

const StyledStoreTextWrapper = styled.View`
  border-bottom-color: ${props => props.theme.colorPalette.primary.main};
  border-bottom-width: 1px;
`;

const RadioFormStyle = {
  width: '100%',
};

export {
  StyledWrapper,
  StyledLabeledRadioBtn,
  RadioFormStyle,
  StyledHeaderBtnWrapper,
  StyledText,
  StyledStoreText,
  StyledStoreTextWrapper,
  StyledBopisBorder,
};
