#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting build process...\n');

try {
  // Check if frontend directory exists
  if (!fs.existsSync('frontend')) {
    throw new Error('Frontend directory not found!');
  }

  // Check if backend directory exists
  if (!fs.existsSync('backend')) {
    throw new Error('Backend directory not found!');
  }

  console.log('📦 Installing dependencies...');
  
  // Install root dependencies
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Install frontend dependencies
  console.log('Installing frontend dependencies...');
  execSync('cd frontend && npm install', { stdio: 'inherit' });

  // Install backend dependencies
  console.log('Installing backend dependencies...');
  execSync('cd backend && npm install', { stdio: 'inherit' });

  console.log('\n🏗️  Building frontend...');
  
  // Build frontend
  execSync('cd frontend && npm run build', { stdio: 'inherit' });

  console.log('\n✅ Build completed successfully!');
  console.log('\n📁 Build output is in frontend/build/');
  console.log('\n🚀 To start the application:');
  console.log('   Backend: cd backend && npm start');
  console.log('   Frontend: Serve the frontend/build/ directory');
  console.log('\n💡 For development: npm run dev');

} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}
