const fs = require('fs');
const path = require('path');

// Function to update the API endpoint in the frontend files
function updateApiEndpoint(elasticBeanstalkUrl) {
  console.log(`Updating API endpoint to: ${elasticBeanstalkUrl}`);
  
  // Find and update API endpoint in HTML files
  const directoryPath = __dirname;
  const htmlFiles = findHtmlFiles(directoryPath);
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace any existing API endpoints with the new one
    content = content.replace(
      /https:\/\/[a-zA-Z0-9.-]+\.elasticbeanstalk\.com\/api|https:\/\/[a-zA-Z0-9.-]+\.onrender\.com\/api|http:\/\/localhost:[0-9]+\/api/g,
      `${elasticBeanstalkUrl}/api`
    );
    
    fs.writeFileSync(file, content);
    console.log(`Updated API endpoint in: ${path.relative(__dirname, file)}`);
  });
  
  console.log('API endpoint update complete!');
}

// Function to find all HTML files in a directory recursively
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html') || file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Get Elastic Beanstalk URL from command line argument
const elasticBeanstalkUrl = process.argv[2];

if (!elasticBeanstalkUrl) {
  console.error('Please provide the Elastic Beanstalk URL as a command line argument.');
  console.error('Example: node update-api-endpoint.js https://enjoy-booking-prod.us-east-1.elasticbeanstalk.com');
  process.exit(1);
}

// Update the API endpoint
updateApiEndpoint(elasticBeanstalkUrl);
