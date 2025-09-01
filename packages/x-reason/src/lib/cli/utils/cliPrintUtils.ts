// ANSI color codes for better CLI experience
export const colors = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

export function colorize(color: keyof typeof colors, text: string) {
  return `${colors[color]}${text}${colors.reset}`;
}

export function printHeader() {
  console.clear();
  console.log(colorize('cyan', colorize('bold', '🤖 X-Reason AI Agent')));
  console.log(colorize('blue', '━'.repeat(50)));
  console.log();
  console.log(colorize('green', "Hello! I'm your X-Reason AI Assistant."));
  console.log();
  console.log(colorize('yellow', '🚀 Available capabilities:'));
  console.log('  • Google Services integration and development');
  console.log('  • More engines coming soon...');
  console.log();
  console.log(colorize('blue', '━'.repeat(50)));
  console.log();
}

export function printSectionHeader(
  title: string,
  step?: number,
  total?: number
) {
  console.log('\n' + colorize('blue', '═'.repeat(60)));

  if (step && total) {
    console.log(
      colorize('cyan', colorize('bold', `📋 Step ${step}/${total}: ${title}`))
    );
  } else {
    console.log(colorize('cyan', colorize('bold', `${title}`)));
  }
  console.log(colorize('blue', '═'.repeat(60)));
}

export function printSubSection(title: string) {
  console.log('\n' + colorize('yellow', '─'.repeat(40)));
  console.log(colorize('yellow', colorize('bold', title)));
  console.log(colorize('yellow', '─'.repeat(40)));
}

export function createLoader(message: string) {
  console.log(colorize('blue', `\n🔄 ${message}`));
  let dots = 0;
  return setInterval(() => {
    process.stdout.write(colorize('dim', '.'));
    dots++;
    if (dots % 20 === 0) {
      process.stdout.write('\n   ');
    }
  }, 300);
}
