const config = {
  // This will lint and format TypeScript and JavaScript files
  "**/*.(ts|tsx|js)": (filenames) => [
    `pnpm eslint --fix ${filenames.join(" ")}`,
    `pnpm prettier --write ${filenames.join(" ")}`,
  ],
  // this will Format MarkDown and JSON
  "**/*.(md|json)": (filenames) => `pnpm prettier --write ${filenames.join(" ")}`,
};

export default config;
