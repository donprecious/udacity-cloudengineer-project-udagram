// import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
// import * as middy from 'middy'
// import { cors, httpErrorHandler } from 'middy/middlewares'

// import { getUserId } from '../utils'
import { generateUploadUrl } from '../../business/todos'
// import { createLogger } from '../../utils/logger'

// const logger = createLogger('auth')
// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     const todoId = event.pathParameters.todoId
//     // TODO: Return a presigned URL to upload a file for a TODO item with the provided id

//     return undefined
//   }
// )

// handler
//   .use(httpErrorHandler())
//   .use(
//     cors({
//       credentials: true
//     })
//   )

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const url = await generateUploadUrl(event.pathParameters.todoId)

  return {
    statusCode: 202,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl: url
    })
  }
}
