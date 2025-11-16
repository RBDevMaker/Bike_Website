import json
import boto3

# Create a DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('Orders')

# Load orders from JSON file
with open('orders.json', 'r') as f:
    orders = json.load(f)

# Add orders to DynamoDB table
print(f"Adding {len(orders)} orders to DynamoDB table 'Orders'...")

for order in orders:
    try:
        table.put_item(Item=order)
        print(f"✓ Added order {order['id']} - Total: ${order['total_amount']} - Date: {order['order_date_time']}")
    except Exception as e:
        print(f"✗ Error adding order {order['id']}: {e}")

print(f"\n{'='*60}")
print(f"Successfully populated Orders table with {len(orders)} orders")
print(f"{'='*60}")
