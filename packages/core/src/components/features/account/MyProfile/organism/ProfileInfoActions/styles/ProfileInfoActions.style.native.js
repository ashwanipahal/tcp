import styled from 'styled-components/native';

export const TopRowWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
`;

export const ProfileProgressWrapper = styled.View`
  flex-shrink: 0;
  flex-basis: 140;
  position: relative;
  align-items: flex-start;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ProfileTextWrapper = styled.View`
  flex-shrink: 1;
  padding-right: 10px;
`;

export const ProfileTileWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
