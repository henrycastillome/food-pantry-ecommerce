// jest.config.js
module.exports = {
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest",
    },
    testEnvironment: "node",
    transformIgnorePatterns: [
        "/node_modules/(?!(@babel/preset-env|@babel/preset-react|axios)/)",
        "node_modules/(?!axios)"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  };
  