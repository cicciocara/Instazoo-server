const missingSetting = "Warning: No value set for this environment variable";

const config = {
  PORT: process.env.PORT || missingSetting,
  SESSION_SECRET: process.env.SESSION_SECRET || missingSetting,
  TOKEN_SECRET: process.env.TOKEN_SECRET || missingSetting,
};

export default config;
