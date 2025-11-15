import boto3
import json

# Configuration
bucket_name = "bikeimages995507554189"
region = "us-east-1"

# Create S3 client
s3 = boto3.client('s3', region_name=region)

# CORS configuration
cors_configuration = {
    'CORSRules': [
        {
            'AllowedHeaders': ['*'],
            'AllowedMethods': ['GET', 'HEAD'],
            'AllowedOrigins': ['*'],
            'ExposeHeaders': ['ETag'],
            'MaxAgeSeconds': 3000
        }
    ]
}

try:
    # Apply CORS configuration
    s3.put_bucket_cors(
        Bucket=bucket_name,
        CORSConfiguration=cors_configuration
    )
    print(f"✓ CORS configuration applied to bucket: {bucket_name}")
    
    # Verify CORS configuration
    response = s3.get_bucket_cors(Bucket=bucket_name)
    print(f"✓ Current CORS rules:")
    print(json.dumps(response['CORSRules'], indent=2))
    
except Exception as e:
    print(f"✗ Error configuring CORS: {e}")
