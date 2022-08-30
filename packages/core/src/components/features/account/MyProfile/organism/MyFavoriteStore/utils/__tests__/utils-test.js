import ctaTitleDefaultStore from '../utils';

const labelState = {
  account: {
    common: {
      lbl_common_updateFavoriteStore: 'Update Favorite Store',
      lbl_common_edit: 'Edit',
      lbl_common_addAStore: 'Add A Store',
    },
  },
};
const titleUpdateStore = 'lbl_common_updateFavoriteStore';
const titleEdit = 'lbl_common_edit';
const titleAdd = 'lbl_common_addAStore';

describe('CTA Title for Default Store', () => {
  it('should show correct CTA title based on default store availability', () => {
    const title = ctaTitleDefaultStore(labelState, '7182431', false);
    expect(title).toBe(titleUpdateStore);
  });
  it('should show correct CTA title based on default store availability in my references', () => {
    const title = ctaTitleDefaultStore(labelState, '7182431', true);
    expect(title).toBe(titleEdit);
  });
  it('should show correct CTA title based if no default store available', () => {
    const title = ctaTitleDefaultStore(labelState, '', true);
    expect(title).toBe(titleAdd);
  });
});
