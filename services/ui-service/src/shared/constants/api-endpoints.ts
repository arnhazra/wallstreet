import { CORE_SERVICE_URL } from "./config"

export const endPoints = {
  // Auth Service
  googleOAuthLogin: `${CORE_SERVICE_URL}/auth/googleoauth`,
  userDetails: `${CORE_SERVICE_URL}/auth/userdetails`,
  refresh: `${CORE_SERVICE_URL}/auth/refresh`,
  signOut: `${CORE_SERVICE_URL}/auth/signout`,
  updateAttribute: `${CORE_SERVICE_URL}/auth/attribute`,
  // Platform Service
  getConfig: `${CORE_SERVICE_URL}/platform/config`,
  intelligence: `${CORE_SERVICE_URL}/platform/intelligence`,
  widgets: `${CORE_SERVICE_URL}/platform/widgets`,
  // Apps Service
  assetgroup: `${CORE_SERVICE_URL}/apps/assetmanager/assetgroup`,
  asset: `${CORE_SERVICE_URL}/apps/assetmanager/asset`,
  debt: `${CORE_SERVICE_URL}/apps/debttrack/debt`,
  goal: `${CORE_SERVICE_URL}/apps/goal`,
  news: `${CORE_SERVICE_URL}/apps/discover/news`,
  expense: `${CORE_SERVICE_URL}/apps/expensetrack/expense`,
  taxAdvisor: `${CORE_SERVICE_URL}/apps/taxadvisor`,
  cashflow: `${CORE_SERVICE_URL}/apps/cashflow`,
  events: `${CORE_SERVICE_URL}/apps/planner/event`,
}
