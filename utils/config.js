export const logConfig = {
  "default": {
    "type": "console",
    "level": "on"
  },
  "AppStart": {
    "level": "on"
  },
  "Authorize": {
    "level": "on"
  },
  "Index": {
    "level": "on"
  },
  "Mine": {
    "level": "on"
  },
  "HttpProxy": {
    "level": "on"
  },
  "Service": {
    "level": "on"
  }
}
export const Level = {
  OFF: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  ON: 4
}
export const Authorize = {
  "enable": true,
  "login": "auth/login/wx"
}
// export const HttpMethod = {
//   GET: 0, 
//   POST: 1, 
//   PUT: 2, 
//   DELETE: 3
// }

export const apiPrefix = 'http://locahost:8080'

export const cfgMock = {
  "enable": true,
  "match": ["^[\\s\\S]*$"]
}