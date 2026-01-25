# Enjoy-Booking Frontend Deployment

This package contains the built frontend files for the Enjoy-Booking application, ready to be deployed to AWS S3.

## Deployment Instructions

1. Make sure you have AWS CLI installed and configured with your credentials:
   ```
   aws configure
   ```

2. Create an S3 bucket for hosting the frontend (if not already created):
   ```
   aws s3 mb s3://enjoy-booking-frontend
   ```

3. Configure the bucket for static website hosting:
   ```
   aws s3 website s3://enjoy-booking-frontend --index-document index.html --error-document 404.html
   ```

4. Set bucket policy for public access:
   Create a file named `bucket-policy.json`:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::enjoy-booking-frontend/*"
       }
     ]
   }
   ```

   Apply the policy:
   ```
   aws s3api put-bucket-policy --bucket enjoy-booking-frontend --policy file://bucket-policy.json
   ```

5. Install dependencies for the deployment script:
   ```
   npm install
   ```

6. Deploy the frontend to S3:
   ```
   npm run deploy
   ```

7. Your website should now be available at:
   `http://enjoy-booking-frontend.s3-website-us-east-1.amazonaws.com`

## CloudFront Setup (Optional but Recommended)

For better performance and HTTPS support, set up a CloudFront distribution:

1. Create a CloudFront distribution in the AWS Console
2. Set the origin to your S3 bucket
3. Configure cache behavior settings
4. Enable HTTPS

After deployment, if you update the frontend, you may need to invalidate the CloudFront cache:
```
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```
