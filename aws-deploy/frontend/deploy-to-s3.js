#!/usr/bin/env node
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// Configure AWS
const s3Client = new S3Client({ region: 'us-east-1' }); // Change to your region

// Bucket name - CHANGE THIS TO YOUR BUCKET NAME
const BUCKET_NAME = 'enjoy-booking-frontend';

// Function to upload a file to S3
async function uploadFile(filePath, bucketPath) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  
  const params = {
    Bucket: BUCKET_NAME,
    Key: bucketPath,
    Body: fileContent,
    ContentType: contentType,
    CacheControl: 'max-age=31536000'
  };
  
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(`File uploaded successfully: ${bucketPath}`);
    return data;
  } catch (err) {
    console.error(`Error uploading file ${bucketPath}: ${err}`);
    throw err;
  }
}

// Function to upload a directory to S3
async function uploadDirectory(directory, s3Prefix = '') {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const s3Path = s3Prefix ? `${s3Prefix}/${file}` : file;
    
    if (fs.statSync(filePath).isDirectory()) {
      await uploadDirectory(filePath, s3Path);
    } else {
      await uploadFile(filePath, s3Path);
    }
  }
}

// Main function
async function deployToS3() {
  console.log(`Deploying frontend to S3 bucket: ${BUCKET_NAME}`);
  
  try {
    await uploadDirectory(path.resolve(__dirname));
    console.log('Frontend deployment to S3 completed successfully!');
    
    console.log('\nNext steps:');
    console.log('1. If you have CloudFront set up, invalidate the cache:');
    console.log('   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"');
    console.log('2. Your website should be available at:');
    console.log(`   http://${BUCKET_NAME}.s3-website-us-east-1.amazonaws.com`);
    console.log('   (or your CloudFront URL if configured)');
  } catch (err) {
    console.error(`Deployment failed: ${err}`);
    process.exit(1);
  }
}

deployToS3();
