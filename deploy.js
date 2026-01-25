const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Function to run a command in a specific directory
function runCommand(command, dir) {
  console.log(`Running "${command}" in ${dir}`);
  try {
    execSync(command, { 
      cwd: dir, 
      stdio: 'inherit',
      shell: true
    });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// Function to read and parse the deployment config
function readDeployConfig() {
  const configPath = path.join(__dirname, 'deploy.config.json');
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error reading deployment config:', error);
    process.exit(1);
  }
}

// Function to build the frontend
function buildFrontend(config) {
  const frontendPath = path.join(__dirname, config.frontend.path);
  
  console.log('\n=== Building Frontend ===\n');
  
  // Set environment variables from config
  if (config.frontend.environment) {
    console.log('Setting frontend environment variables...');
    const envPath = path.join(frontendPath, '.env.production.local');
    let envContent = '';
    
    for (const [key, value] of Object.entries(config.frontend.environment)) {
      envContent += `${key}=${value}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log('Environment variables set successfully.');
  }
  
  // Run build command
  runCommand(config.frontend.buildCommand, frontendPath);
  
  console.log('\n=== Frontend Build Complete ===\n');
  return path.join(frontendPath, config.frontend.outputDir || 'out');
}

// Function to prepare the backend for deployment
function prepareBackend(config) {
  const backendPath = path.join(__dirname, config.backend.path);
  
  console.log('\n=== Preparing Backend ===\n');
  
  // Set environment variables from config
  if (config.backend.environment) {
    console.log('Setting backend environment variables...');
    const envPath = path.join(backendPath, '.env.production');
    let envContent = '';
    
    for (const [key, value] of Object.entries(config.backend.environment)) {
      envContent += `${key}=${value}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log('Environment variables set successfully.');
  }
  
  // Install production dependencies
  runCommand('npm ci --production', backendPath);
  
  console.log('\n=== Backend Preparation Complete ===\n');
  return backendPath;
}

// Function to create a deployment package
function createDeploymentPackage(frontendBuildPath, backendPath, config) {
  const deployDir = path.join(__dirname, 'deploy');
  
  console.log('\n=== Creating Deployment Package ===\n');
  
  // Create deploy directory if it doesn't exist
  if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir);
  } else {
    // Clean up existing deploy directory
    fs.rmSync(deployDir, { recursive: true, force: true });
    fs.mkdirSync(deployDir);
  }
  
  // Create directories for frontend and backend
  const deployFrontendDir = path.join(deployDir, 'frontend');
  const deployBackendDir = path.join(deployDir, 'backend');
  
  fs.mkdirSync(deployFrontendDir);
  fs.mkdirSync(deployBackendDir);
  
  // Copy frontend build files
  console.log('Copying frontend build files...');
  fs.cpSync(frontendBuildPath, deployFrontendDir, { recursive: true });
  
  // Copy backend files
  console.log('Copying backend files...');
  
  // Define files and directories to exclude from backend copy
  const excludeList = [
    'node_modules',
    '.git',
    '.env',
    '.env.development',
    'npm-debug.log',
    'yarn-debug.log',
    'yarn-error.log'
  ];
  
  // Copy backend files excluding the ones in excludeList
  fs.readdirSync(backendPath).forEach(item => {
    if (!excludeList.includes(item)) {
      const srcPath = path.join(backendPath, item);
      const destPath = path.join(deployBackendDir, item);
      
      if (fs.lstatSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });
  
  // Copy production environment file
  const prodEnvPath = path.join(backendPath, '.env.production');
  if (fs.existsSync(prodEnvPath)) {
    fs.copyFileSync(prodEnvPath, path.join(deployBackendDir, '.env'));
  }
  
  // Create a package.json for the deployment package
  const packageJson = {
    name: config.name,
    version: '1.0.0',
    private: true,
    scripts: {
      start: 'cd backend && node server.js'
    }
  };
  
  fs.writeFileSync(
    path.join(deployDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  
  // Create a README for deployment
  const readmeContent = `# ${config.name} Deployment Package

This package contains the built frontend and backend for the ${config.name} application.

## Structure

- \`frontend/\`: Contains the built frontend files
- \`backend/\`: Contains the backend files

## Deployment Instructions

### Backend

1. Deploy the \`backend\` directory to your server
2. Install dependencies: \`cd backend && npm install --production\`
3. Start the server: \`node server.js\`

### Frontend

Deploy the \`frontend\` directory to a static hosting service like Netlify, Vercel, or GitHub Pages.

## Environment Variables

Make sure to set the appropriate environment variables on your hosting platform.
`;
  
  fs.writeFileSync(path.join(deployDir, 'README.md'), readmeContent);
  
  console.log('\n=== Deployment Package Created Successfully ===\n');
  console.log(`Deployment package is available in the '${deployDir}' directory.`);
}

// Main deployment function
async function deploy() {
  console.log('=== Starting Deployment Process ===\n');
  
  // Read deployment config
  const config = readDeployConfig();
  
  // Build frontend
  const frontendBuildPath = buildFrontend(config);
  
  // Prepare backend
  const backendPath = prepareBackend(config);
  
  // Create deployment package
  createDeploymentPackage(frontendBuildPath, backendPath, config);
  
  console.log('\n=== Deployment Process Completed Successfully ===\n');
  console.log('Next steps:');
  console.log('1. Upload the frontend to a static hosting service like Netlify or Vercel');
  console.log('2. Deploy the backend to a server like Heroku, DigitalOcean, or Render');
}

// Run the deployment process
deploy().catch(console.error);
