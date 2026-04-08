import ky from "ky"
import { CORE_SERVICE_URL_BY_ENV } from "../constants/config"
const FETCH_TIMEOUT = 60_000
const STREAM_TIMEOUT = 300000

const api = ky.create({
  timeout: FETCH_TIMEOUT,
  baseUrl: CORE_SERVICE_URL_BY_ENV,
  retry: {
    limit: 2,
    methods: ["get", "post", "put", "delete"],
    statusCodes: [408, 500, 502, 503, 504, 401, 403],
    delay: (attemptCount) => {
      return 1000 * attemptCount
    },
  },
})

export const streamApi = ky.create({
  timeout: STREAM_TIMEOUT,
  baseUrl: CORE_SERVICE_URL_BY_ENV,
  retry: {
    limit: 2,
    methods: ["get", "post", "put", "delete"],
    statusCodes: [401],
    delay: (attemptCount) => {
      return 1000 * attemptCount
    },
  },
})

export default api
