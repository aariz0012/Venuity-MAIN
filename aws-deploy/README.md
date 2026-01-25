# Enjoy-Booking AWS Deployment Package

This package contains the built frontend and backend for the Enjoy-Booking application, configured for AWS deployment.

## Structure

- `frontend/`: Contains the built frontend files for S3 deployment
- `backend.zip`: Zipped backend package ready for Elastic Beanstalk deployment
- `backend-env-settings.json`: Elastic Beanstalk environment settings

## Deployment Instructions

### Backend (Elastic Beanstalk)

1. Configure AWS CLI with your credentials:
   ```
   aws configure
   ```

2. Create an Elastic Beanstalk application (if not already created):
   ```
   aws elasticbeanstalk create-application --application-name enjoy-booking
   ```

3. Create an S3 bucket for application versions (if not already created):
   ```
   aws s3 mb s3://enjoy-booking-deployments
   ```

4. Upload the backend.zip to S3:
   ```
   aws s3 cp backend.zip s3://enjoy-booking-deployments/
   ```

5. Create an Elastic Beanstalk environment:
   ```
   aws elasticbeanstalk create-environment \
     --application-name enjoy-booking \
     --environment-name enjoy-booking-prod \
     --solution-stack-name "64bit Amazon Linux 2 v5.8.0 running Node.js 16" \
     --option-settings file://backend-env-settings.json
   ```

6. Create an application version:
   ```
   aws elasticbeanstalk create-application-version \
     --application-name enjoy-booking \
     --version-label v1 \
     --source-bundle S3Bucket=enjoy-booking-deployments,S3Key=backend.zip
   ```

7. Deploy the application:
   ```
   aws elasticbeanstalk update-environment \
     --environment-name enjoy-booking-prod \
     --version-label v1
   ```

### Frontend (S3 + CloudFront)

See the README.md file in the frontend directory for detailed instructions.

## Environment Variables

Make sure to set the appropriate environment variables in the Elastic Beanstalk console:
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRE
- EMAIL_SERVICE
- EMAIL_USERNAME
- EMAIL_PASSWORD
- EMAIL_FROM
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_PHONE_NUMBER
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET

## Connecting Frontend to Backend

After deploying the backend, update the frontend API endpoint in the frontend deployment script:
1. Open `frontend/deploy-to-s3.js`
2. Update the `NEXT_PUBLIC_API_URL` to point to your Elastic Beanstalk URL
3. Redeploy the frontend

## Monitoring and Maintenance

- Use AWS CloudWatch to monitor your Elastic Beanstalk environment
- Set up alarms for important metrics
- Configure log rotation and retention policies
