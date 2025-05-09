import path from 'path';
import dotenv from 'dotenv';
import { writeGreeting } from '../src/writeGreeting';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

async function sendTestGreeting(city?: string): Promise<void> {
  try {
    console.log('🚀 Starting greeting test...\n');

    const result = await writeGreeting(city ?? 'San Francisco');
    console.log('writeGreeting returned:', JSON.stringify(result, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  }
}

// Only run CLI code when this file is executed directly
if (require.main === module) {
  // Handle command line arguments based on the operation
  const operation = process.argv[2];
  const [arg1, arg2, arg3, arg4] = process.argv.slice(3);

  switch (operation) {
    case 'greet':
      sendTestGreeting(arg1);
      break;
    default:
      console.error('Invalid operation. Available operations: email, schedule, find-time');
      process.exit(1);
  }
} 