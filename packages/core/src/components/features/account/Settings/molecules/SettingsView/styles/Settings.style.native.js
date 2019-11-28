import styled from 'styled-components/native';

const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 0px;
`;

const AboutWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export { Row, AboutWrapper };
