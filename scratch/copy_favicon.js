const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'public', 'images', 'personal', 'favicon_profile_pic.png');
const dest = path.join(__dirname, '..', 'public', 'favicon.ico');

try {
  fs.copyFileSync(source, dest);
  console.log('Successfully copied favicon to public/favicon.ico');
} catch (error) {
  console.error('Error copying favicon:', error);
}
