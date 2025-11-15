import json
import boto3

# Configuration
s3_bucket = "bikeimages995507554189"
s3_prefix = "images/"
dynamodb_table = "BikeProducts"
region = "us-east-1"

# Initialize AWS clients
s3 = boto3.client('s3', region_name=region)
dynamodb = boto3.resource('dynamodb', region_name=region)
table = dynamodb.Table(dynamodb_table)

print(f"Fetching images from S3 bucket: {s3_bucket}/{s3_prefix}")

# List all objects in the bucket under the prefix
response = s3.list_objects_v2(Bucket=s3_bucket, Prefix=s3_prefix)

if 'Contents' not in response:
    print("No images found in S3 bucket!")
    exit(1)

products_added = 0

for idx, obj in enumerate(response['Contents'], start=1):
    filename = obj['Key'].split('/')[-1]
    if not filename:  # skip folders
        continue
    
    # Create product data
    product_name = filename.split('.')[0].replace('-', ' ').replace('_', ' ').title()
    product_id = str(idx)
    
    product = {
        'id': product_id,
        'name': product_name,
        'description': f"High-quality {product_name.lower()} for your bike",
        'price': str(round(10.0 + (idx * 5.5), 2)),
        'product_group': 'Bike Parts',
        'image': f"https://{s3_bucket}.s3.{region}.amazonaws.com/{obj['Key']}",
        'image_name': filename
    }
    
    # Add to DynamoDB
    try:
        table.put_item(Item=product)
        print(f"✓ Added: {product_name} (ID: {product_id}) - ${product['price']}")
        products_added += 1
    except Exception as e:
        print(f"✗ Error adding {product_name}: {e}")

print(f"\n{'='*50}")
print(f"Successfully added {products_added} products to DynamoDB table '{dynamodb_table}'")
print(f"{'='*50}")
