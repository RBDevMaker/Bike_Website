import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BikeProducts')

def lambda_handler(event, context):
    try:
        # Scan the table to retrieve all products
        response = table.scan()
        products = response['Items']

        # Loop through the products and retrieve additional information
        for product in products:
            product_id = product['id']
            product_name = product['name']
            product_price = product['price']
            product_description = product['description']

            # Add the product information to a list
            product_info = {
                'id': product_id,
                'name': product_name,
                'price': product_price,
                'description': product_description
            }
            products_list.append(product_info)

        # Return the list of products
        return {
            'statusCode': 200,
            'body': json.dumps(products_list)
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': 'Error retrieving products'
        }