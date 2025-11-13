const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
const outputDir = path.join(__dirname, '..', '.next', 'server', 'app');

function injectScript(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      injectScript(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (!content.includes('dashboard-console-capture.js')) {
        content = content.replace('</head>', `${scriptTag}</head>`);
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

injectScript(outputDir);
console.log('Console capture script injected into build files');