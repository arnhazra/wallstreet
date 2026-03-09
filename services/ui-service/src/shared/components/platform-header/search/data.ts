export const searchMapByUrl = {
  "/dashboard": "app",
  "/apps/assetmanager/assetgroup": "asset",
  "/apps/assetmanager": "asset group",
  "/apps/debttrack": "debt",
  "/apps/discover": "news",
  "/apps/expensetrack": "expense",
  "/apps/cashflow": "cashflow",
}

export function getSearchLabel(pathName: string) {
  if (searchMapByUrl[pathName as keyof typeof searchMapByUrl]) {
    return searchMapByUrl[pathName as keyof typeof searchMapByUrl]
  }

  const entry = Object.entries(searchMapByUrl).find(([k]) =>
    pathName.startsWith(k)
  )
  return entry ? entry[1] : ""
}
