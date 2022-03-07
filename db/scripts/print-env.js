const config = require("dotenv").config()
console.log(
  Object
    .keys(config.parsed)
    .map(key => `${key}="${config.parsed[key]}"`)
    .join("\n")
)