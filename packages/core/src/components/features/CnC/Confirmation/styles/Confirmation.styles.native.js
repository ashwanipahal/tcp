import styled from 'styled-components/native';

const Wrapper = styled.ScrollView`
  display: flex;
`;

const InnerWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ThankYouWrapper = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
  height: 400px;
`;

export { Wrapper, ThankYouWrapper, InnerWrapper };
