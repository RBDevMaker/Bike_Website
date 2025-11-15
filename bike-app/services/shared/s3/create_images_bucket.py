import boto3
import datetime
import json

# Get AWS account ID
sts_client = boto3.client('sts')
account_id = sts_client.get_caller_identity()['Account']

# Bucket name
today = datetime.date.today().strftime("%Y-%m-%d")
bucket_name = f"images-{account_id}-{today}"

# AWS region
region = boto3.session.Session().region_name

# Create S3 client
s3 = boto3.client('s3', region_name=region)

# Create bucket with region check
if region == 'us-east-1':
    s3.create_bucket(Bucket=bucket_name)
else:
    s3.create_bucket(
        Bucket=bucket_name,
        CreateBucketConfiguration={'LocationConstraint': region}
    )

print(f"Bucket created: {bucket_name}")

# Optional: add public read policy
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

s3.put_bucket_policy(Bucket=bucket_name, Policy=json.dumps(bucket_policy))
print("Public read policy applied to bucket objects")
