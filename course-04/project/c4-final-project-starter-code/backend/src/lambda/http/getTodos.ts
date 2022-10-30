// import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'

import { getUserId } from '../utils'
import { getAllToDo } from '../../business/todos'

// // TODO: Get all TODO items for a current user
// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     // Write your code here
//     const todos = '...'

//     return undefined

// handler.use(
//   cors({
//     credentials: true
//   })
// )

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const token = getUserId(event)

  const toDos = await getAllToDo(token)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: toDos
    })
  }
}