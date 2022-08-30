import styled from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const RichTextContainer = styled.View`
  width: auto;
  height: 500px;
`;

const AccordionHeader = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ImageStyleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const SubmissionFormWrapper = styled.View`
  height: ${props => props.height}px;
`;

const ProductRatingsContainer = styled.View`
  ${getAdditionalStyle}
`;

export {
  RichTextContainer,
  AccordionHeader,
  ImageStyleWrapper,
  ProductRatingsContainer,
  SubmissionFormWrapper,
};
