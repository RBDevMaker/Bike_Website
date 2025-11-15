import boto3
import json

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('BikeProducts')

response = table.scan()
items = response['Items']

print(f"Found {len(items)} items in DynamoDB")
print("\nFirst 3 products:")
for item in items[:3]:
    print(json.dumps(item, indent=2))
