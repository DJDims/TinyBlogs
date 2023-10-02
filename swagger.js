import swaggerAutogen from "swagger-autogen"

const outputFile = './swagger_output.json'
const endpointsFiles = ["./Routes/*.js"]

swaggerAutogen()(outputFile, endpointsFiles)