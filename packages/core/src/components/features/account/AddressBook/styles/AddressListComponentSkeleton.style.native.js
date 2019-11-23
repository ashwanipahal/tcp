import styled from 'styled-components/native';

const AddressTileWrapper = styled.View`
  display: flex;
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export default AddressTileWrapper;
