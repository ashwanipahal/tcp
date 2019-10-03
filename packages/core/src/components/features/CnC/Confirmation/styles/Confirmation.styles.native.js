import styled from 'styled-components/native';

const Wrapper = styled.ScrollView`
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const SMSWrapper = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
`;

const ThankYouWrapper = styled.View`
background-color: ${props => props.theme.colorPalette.gray[500]};
margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
height:400px;
`;



export { Wrapper, SMSWrapper, ThankYouWrapper };
