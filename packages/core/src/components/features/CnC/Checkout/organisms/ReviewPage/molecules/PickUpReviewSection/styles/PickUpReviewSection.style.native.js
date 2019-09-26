import styled from 'styled-components';

const Container = styled.View`
  width: 100%;
`;

const SectionOne = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const SectionTwo = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const SectionThree = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export { Container, SectionOne, SectionTwo, SectionThree };
