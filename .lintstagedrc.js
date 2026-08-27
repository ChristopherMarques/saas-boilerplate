export default {
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write",
    () => "npm run type-check",
    () => "npm run test"
  ],
  "*.{css,md,json}": [
    "prettier --write"
  ]
};
