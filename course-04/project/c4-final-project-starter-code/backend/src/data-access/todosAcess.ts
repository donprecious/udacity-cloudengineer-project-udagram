import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

export class ToDoAccess {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly todoTable = process.env.TODOS_TABLE
  ) {}

  async getAllToDo(userId: string): Promise<TodoItem[]> {
    const params = {
      TableName: this.todoTable,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }
    logger.info('retrieving todo items')
    const result = await this.docClient.query(params).promise()

    const items = result.Items

    return items as TodoItem[]
  }

  async createToDo(todoItem: TodoItem): Promise<TodoItem> {
    const params = {
      TableName: this.todoTable,
      Item: todoItem
    }
    logger.info('creating a new todo')
    await this.docClient.put(params).promise()
    logger.info('new todo created successfully')

    return todoItem as TodoItem
  }

  async updateToDo(
    todoUpdate: TodoUpdate,
    todoId: string,
    userId: string
  ): Promise<TodoUpdate> {
    const params = {
      TableName: this.todoTable,
      Key: {
        userId: userId,
        todoId: todoId
      },
      UpdateExpression: 'set #a = :a, #b = :b, #c = :c',
      ExpressionAttributeNames: {
        '#a': 'name',
        '#b': 'dueDate',
        '#c': 'done'
      },
      ExpressionAttributeValues: {
        ':a': todoUpdate['name'],
        ':b': todoUpdate['dueDate'],
        ':c': todoUpdate['done']
      },
      ReturnValues: 'ALL_NEW'
    }

    const result = await this.docClient.update(params).promise()
    logger.info('completed updating record', JSON.stringify(result))
    const attributes = result.Attributes

    return attributes as TodoUpdate
  }

  async deleteToDo(todoId: string, userId: string): Promise<string> {
    const params = {
      TableName: this.todoTable,
      Key: {
        userId: userId,
        todoId: todoId
      }
    }

    const result = await this.docClient.delete(params).promise()
    logger.info('record deleted', JSON.stringify(result))

    return '' as string
  }
}
