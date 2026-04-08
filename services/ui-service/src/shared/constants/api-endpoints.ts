import { CORE_SERVICE_URL_BY_ENV } from "./config"

export const endPoints = {
  // Auth Service
  googleOAuthLogin: `${CORE_SERVICE_URL_BY_ENV}/auth/googleoauth`,
  userDetails: `${CORE_SERVICE_URL_BY_ENV}/auth/userdetails`,
  refresh: `${CORE_SERVICE_URL_BY_ENV}/auth/refresh`,
  signOut: `${CORE_SERVICE_URL_BY_ENV}/auth/signout`,
  updateAttribute: `${CORE_SERVICE_URL_BY_ENV}/auth/attribute`,
  // Platform Service
  getConfig: `${CORE_SERVICE_URL_BY_ENV}/platform/config`,
  cowork: `${CORE_SERVICE_URL_BY_ENV}/platform/cowork`,
  widgets: `${CORE_SERVICE_URL_BY_ENV}/platform/widgets`,
  // Resource Service
  assetgroup: `${CORE_SERVICE_URL_BY_ENV}/resource/assetgroup`,
  asset: `${CORE_SERVICE_URL_BY_ENV}/resource/asset`,
  debt: `${CORE_SERVICE_URL_BY_ENV}/resource/debt`,
  goal: `${CORE_SERVICE_URL_BY_ENV}/resource/goal`,
  news: `${CORE_SERVICE_URL_BY_ENV}/resource/news`,
  expense: `${CORE_SERVICE_URL_BY_ENV}/resource/expense`,
  tax: `${CORE_SERVICE_URL_BY_ENV}/resource/tax`,
  cashflow: `${CORE_SERVICE_URL_BY_ENV}/resource/cashflow`,
  events: `${CORE_SERVICE_URL_BY_ENV}/resource/event`,
}
