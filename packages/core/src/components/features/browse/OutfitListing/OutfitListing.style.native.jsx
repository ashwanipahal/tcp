import styled from 'styled-components';

const Container = styled.FlatList`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const Separator = styled.View`
  height: 1px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  background: ${props => props.theme.colorPalette.gray[1500]};
`;

const AnchorStyle = {
  marginTop: 4,
};

export { Container, Separator, AnchorStyle };
