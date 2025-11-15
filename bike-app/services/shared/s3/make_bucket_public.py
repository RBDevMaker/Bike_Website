import boto3
import json

bucket_name = "bikeimages995507554189"
region = "us-east-1"

s3 = boto3.client('s3', region_name=region)

# Public read policy
bucket_policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": f"arn:aws:s3:::{bucket_name}/*"
        }
    ]
}

try:
    # Remove block public access
    s3.delete_public_access_block(Bucket=bucket_name)
    print(f"✓ Removed public access block")
except Exception as e:
    print(f"Note: {e}")

try:
    # Apply public read policy
    s3.put_bucket_policy(Bucket=bucket_name, Policy=json.dumps(bucket_policy))
    print(f"✓ Public read policy applied to bucket: {bucket_name}")
    print(f"✓ Images are now publicly accessible")
except Exception as e:
    print(f"✗ Error: {e}")
