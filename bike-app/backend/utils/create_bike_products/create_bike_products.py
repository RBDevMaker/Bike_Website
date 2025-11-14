import json
import boto3

# Load products from JSON file
with open('products.json') as f:
    products = json.load(f)

# Create DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BikeProducts')

# Add products to DynamoDB table
for product in products:
    product_id = str(product['id'])
    product_price = str(product['price'])
    table.put_item(
        Item={
            'id': product_id,
            'product_name': product['product_name'],
            'description': product['description'],
            'price': product_price,
            'product_group': product['product_group'],
            'image_url': product['image_url']
        }
    )
    print(f"Added product {product_id} to DynamoDB table")