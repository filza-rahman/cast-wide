import { PutCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb"
import { dynamo, TABLE } from "./dynamodb"
import type { Generation } from "@/lib/platforms"

export async function addGeneration(gen: Generation) {
  await dynamo.send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        userId: "anonymous",
        createdAt: gen.createdAt,
        id: gen.id,
        idea: gen.idea,
        platforms: gen.platforms,
        results: gen.results,
      },
    })
  )
}

export async function deleteGeneration(createdAt: string) {
  await dynamo.send(
    new DeleteCommand({
      TableName: TABLE,
      Key: { userId: "anonymous", createdAt },
    })
  )
}

export async function getGenerations(): Promise<Generation[]> {
  const res = await dynamo.send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": "anonymous" },
      ScanIndexForward: false,
      Limit: 50,
    })
  )
  return (res.Items ?? []) as Generation[]
}