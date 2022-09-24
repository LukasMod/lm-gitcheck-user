module.exports = {
  '*.{ts,tsx}': ['yarn lint', 'tsc-files --noEmit', 'yarn test --findRelatedTests'],
}
