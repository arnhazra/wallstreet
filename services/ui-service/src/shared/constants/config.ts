export const PLATFORM_NAME = "WallStreet"
export const GOOGLE_OAUTH_CLIENT_ID =
  "211974992845-eas8uh5t2ki6jft4tajq57ppr8skseau.apps.googleusercontent.com"
export const CORE_SERVICE_URL =
  process.env.NODE_ENV === "production"
    ? "https://core-service-wallstreet.azurewebsites.net"
    : "http://localhost:8080"
