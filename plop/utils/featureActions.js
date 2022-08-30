const featureBasePath =
  './packages/{{featurePackageType}}/src/components/features/{{featureName}}/';

const featureActions = [
  // Add all the template files to the dest folder
  'Copying test files...',
  {
    type: 'add',
    path: `${featureBasePath}/.gitkeep`,
    templateFile: './plop/templates/.gitkeep',
  },
];

module.exports = {
  featureBasePath,
  featureActions,
};
