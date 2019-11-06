import styled from 'styled-components/native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

const UnderlineStyle = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const TileContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[700]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const RowContainer = styled(ViewWithSpacing)`
  flex-direction: row;
`;

const CardDetailContainer = styled(ViewWithSpacing)`
  flex-direction: row;
  align-items: center;
`;

export { UnderlineStyle, TileContainer, RowContainer, CardDetailContainer };
