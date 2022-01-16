const env = process.env;

export const Config = {
  API_BASE_URL: env.APP_API_BASE_URL || "https://beta.mailbutler.io/api/v2",
};
