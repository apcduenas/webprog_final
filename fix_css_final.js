const fs = require('fs');
const path = 'c:\\Users\\Anthony\\Downloads\\webprog_final\\react-portfolio\\src\\index.css';
let content = fs.readFileSync(path, 'utf8');

const blurryDark = `@keyframes ignite-flicker {
  0%, 100% {
    text-shadow:
      0 0 4px #fff,
      0 -2px 10px #ff0,
      0 -4px 15px #ff8000,
      0 -6px 20px #ff4500,
      2px -8px 25px #b22222;
    transform: skewX(-1deg) scale(1.02);
  }
  25% {
    text-shadow:
      0 0 4px #fff,
      2px -3px 12px #ff0, -2px -5px 18px #ff8000,
      1px -8px 25px #ff4500, -3px -12px 30px #b22222;
    transform: skewX(1deg) scale(1);
  }
  50% {
    text-shadow:
      0 0 4px #fff,
      -2px -2px 10px #ff0, 2px -4px 15px #ff8000,
      -1px -7px 22px #ff4500, 4px -10px 28px #b22222;
    transform: skewX(-0.5deg) scale(1.01);
  }
  75% {
    text-shadow:
      0 0 5px #fff,
      1px -4px 14px #ff0, -1px -6px 20px #ff8000,
      2px -9px 28px #ff4500, -2px -15px 35px #b22222;
    transform: skewX(0.5deg) scale(1);
  }
}`;

const blurryBlue = `@keyframes ignite-flicker-blue {
  0%, 100% {
    text-shadow:
      0 0 4px #fff,
      0 -2px 10px #00f,
      0 -4px 15px #00bfff,
      0 -6px 20px #1e90ff,
      2px -8px 25px #003399;
    transform: skewX(-1deg) scale(1.02);
  }
  25% {
    text-shadow:
      0 0 4px #fff,
      2px -3px 12px #00f, -2px -5px 18px #00bfff,
      1px -8px 25px #1e90ff, -3px -12px 30px #003399;
    transform: skewX(1deg) scale(1);
  }
  50% {
    text-shadow:
      0 0 4px #fff,
      -2px -2px 10px #00f, 2px -4px 15px #00bfff,
      -1px -7px 22px #1e90ff, 4px -10px 28px #003399;
    transform: skewX(-0.5deg) scale(1.01);
  }
  75% {
    text-shadow:
      0 0 5px #fff,
      1px -4px 14px #00f, -1px -6px 20px #00bfff,
      2px -9px 28px #1e90ff, -2px -15px 35px #003399;
    transform: skewX(0.5deg) scale(1);
  }
}`;

// Use a more aggressive replacement to clean up the mess between ignite-flicker and .ignite-text
// We'll replace everything from the first @keyframes ignite-flicker down to the start of .ignite-text
const startMarker = '/* IGNITE FLAME ANIMATION */';
const endMarker = '.ignite-text {';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) +
        startMarker + '\n' + blurryDark + '\n\n/* BLUE FLAME ANIMATION (FOR LIGHT MODE) */\n' + blurryBlue + '\n\n' +
        content.substring(endIndex);

    // Also ensure drop-shadow is present
    content = newContent.replace(/\.ignite-text \{([\s\S]*?)letter-spacing: 2px;([\s\S]*?)\}/,
        '.ignite-text {$1letter-spacing: 2px;\n  filter: drop-shadow(0 0 5px rgba(255, 69, 0, 0.5));$2}');

    content = content.replace(/html\.light-mode \.ignite-text \{([\s\S]*?)animation: ignite-flicker-blue 0\.1s infinite alternate;([\s\S]*?)\}/,
        'html.light-mode .ignite-text {$1animation: ignite-flicker-blue 0.1s infinite alternate;\n  filter: drop-shadow(0 0 5px rgba(0, 102, 204, 0.5));$2}');

    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully restored thick blur and fixed syntax error');
} else {
    console.error('Could not find markers');
}
