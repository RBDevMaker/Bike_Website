import boto3
import json
from datetime import datetime
from decimal import Decimal
import uuid

def lambda_handler(event, context):
    # Create a DynamoDB resource
    dynamodb = boto3.resource('dynamodb')
    # Connect to the DynamoDB table named 'Orders'
    orders_table = dynamodb.Table('Orders')
    
    try:
        # Store the body of the post request in a variable named input_data
        input_data = json.loads(event.get('body', '{}'))
        
        # Generate a unique ID for the order
        order_id = str(uuid.uuid4())
        
        # Initialize total amount and order items list
        total_amount = 0.0
        order_items = []
    
        # Iterate through the input data
        for product_name, product_details in input_data.items():
            quantity = product_details["quantity"]
            price = float(product_details["price"])
            if quantity > 0:
                # Add this products quantity * price to the total amount
                total_amount += (quantity * price)
                
                # Add the product to the order items list
                order_items.append({
                    "product_name": product_name,
                    "product_id": str(product_details["id"]),
                    "quantity": str(quantity),
                    "amount": f"{price:.2f}"
                })
        
        # Prepare the final order structure
        order = {
            "id": order_id,
            "total_amount": f"{total_amount:.2f}",
            "order_date_time": datetime.now().isoformat() + "Z",
            "order_items": order_items
        }
        
        #insert the order into the orders table
        orders_table.put_item(Item=order)

        # Create a response with a 200 status code, the order ID, and CORS headers
        response = {
            'statusCode': 200,
            'body': json.dumps({'message': 'Order created successfully', 'order_id': order_id}),
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
        }
        
    # Add an exception block that creates a response with a 500 status code, the error message 'Error fetching order history' and CORS headers
    except Exception as e:
        response = {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error creating order', 'error': str(e)}),
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
        }

    # return the response
    return response
