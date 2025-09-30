// Simple test script for Google Chat service
// Run with: npx ts-node test-chat.ts

import { makeGSuiteClientV2 } from './src/lib/gsuiteClient.v2';

async function testChatMessage() {
  try {
    console.log('🧪 Testing Google Chat service...');
    
    // Replace with your email (needs to be in your Google Workspace domain)
    const userEmail = 'jphansberry@gunsandgit.com';
    
    console.log(`📧 Creating client for user: ${userEmail}`);
    const client = await makeGSuiteClientV2(userEmail);
    
    const testMessage = {
      message: `Test message from Google Chat service - ${new Date().toISOString()}`,
      channelId: 'spaces/AAQAq6CsEA0'
    };
    
    console.log('📨 Sending message:', testMessage.message);
    
    const result = await client.sendChatMessage(testMessage);
    
    console.log('✅ Message sent successfully!');
    console.log('📋 Result:', {
      messageId: result.messageId,
      timestamp: result.timestamp,
      success: result.success
    });
    
  } catch (error) {
    console.error('❌ Error sending message:');
    console.error('Error message:', (error as Error).message);
    console.error('Error details:', error);
  }
}

testChatMessage();