import boto3
import json
from decimal import Decimal

# This function uses JSON.dumps to ensure proper object serialization.
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def lambda_handler(event, context):
    # Create DynamoDB resource
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Orders')
    
    try:
        # Scan the table to retrieve all orders
        response = table.scan()
        orders = response['Items']
        
        # Handle pagination if there are more items
        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            orders.extend(response['Items'])
        
        # Return the list of orders with proper serialization
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            'body': json.dumps(orders, default=decimal_default)
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            'body': json.dumps({'message': 'Error retrieving orders'})
        }
