export default action => {
  if (action.type.startsWith('TRACK_')) {
    return () => ({ hitType: 'generic' });
  }
  return [];
};
