import styled from 'styled-components';

const Container = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
`;

const SectionOne = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const SectionTwo = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const SectionThree = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const TitlePlusContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export { Container, SectionOne, SectionTwo, SectionThree, TitlePlusContainer };
