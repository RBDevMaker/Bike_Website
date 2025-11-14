import json
import boto3

# AWS credentials will be taken from your environment or ~/.aws/credentials
s3_bucket = "bikeimages995507554189"
s3_prefix = "images/"  # folder inside the bucket

# Initialize S3 client
s3 = boto3.client('s3', region_name='us-east-1')

# List all objects in the bucket under the prefix
response = s3.list_objects_v2(Bucket=s3_bucket, Prefix=s3_prefix)

products = []

if 'Contents' in response:
    for idx, obj in enumerate(response['Contents'], start=1):
        filename = obj['Key'].split('/')[-1]
        if not filename:  # skip folders
            continue
        # Example product info – you can customize these fields
        product = {
            "id": idx,
            "product_name": filename.split('.')[0],  # use filename as product name
            "description": f"Description for {filename}",
            "price": 10.0 * idx,  # just example prices
            "product_group": "Default Group",
            "image_url": f"https://{s3_bucket}.s3.us-east-1.amazonaws.com/{obj['Key']}",
            "image_name": filename
        }
        products.append(product)

# Save to custom_product.json
with open("bike_product.json", "w") as f:
    json.dump(products, f, indent=4)

print(f"custom_products.json created with {len(products)} products!")
