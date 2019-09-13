import styled from 'styled-components/native';

const AddressFieldsWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const SaveToAccountWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  flex-direction: row;
`;

const MarginBottom = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const AddressViewWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export { AddressFieldsWrapper, SaveToAccountWrapper, MarginBottom, AddressViewWrapper };
