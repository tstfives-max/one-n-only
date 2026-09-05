const fs = require('fs');

const content = fs.readFileSync('C:/Users/LAPPY MALL/.gemini/antigravity-ide/brain/a590f987-6b65-4ba8-afc8-9929dd533535/.system_generated/steps/256/content.md', 'utf8');

// Extract all menu items
const menuRegex = /<h3 class="mi-name">(.*?)<\/h3>\s*<span class="mi-price">(.*?)<\/span>(?:\s*<p class="mi-desc">(.*?)<\/p>)?(?:\s*<p class="mi-note">(.*?)<\/p>)?/g;
let match;
let menu = [];

while ((match = menuRegex.exec(content)) !== null) {
  menu.push({
    name: match[1].trim(),
    price: match[2].trim(),
    desc: match[3] ? match[3].trim() : '',
    note: match[4] ? match[4].trim() : ''
  });
}

const formattedMenu = menu.map(m => `- ${m.name} (${m.price})${m.desc ? ': ' + m.desc : ''}${m.note ? ' [' + m.note + ']' : ''}`).join('\n');

const infoRegex = /<h3[^>]*>(.*?)<\/h3>\s*<p class="tag">(.*?)<\/p>\s*<p class="copy">(.*?)<\/p>/g;
let info = [];
while ((match = infoRegex.exec(content)) !== null) {
  info.push(`- **${match[1].trim()}** (${match[2].trim()}): ${match[3].trim()}`);
}

const formattedInfo = info.join('\n');

const output = `### Complete Menu\n${formattedMenu}\n\n### More Details\n${formattedInfo}`;

fs.writeFileSync('C:/Users/LAPPY MALL/Desktop/New folder (2)/extracted_menu.txt', output);
console.log(`Extracted ${menu.length} menu items and ${info.length} info blocks.`);
