import { makeGSuiteClientV2 } from '../gsuiteClient.v2';

// Integration test for Google Chat service
// This test will send real messages to your Google Chat space
describe('Google Chat Integration Tests', () => {
  it('should send a real message to Google Chat space', async () => {
    console.log('🧪 Testing Google Chat service integration...');
    
    // Replace with your email (needs to be in your Google Workspace domain)
    const userEmail = 'jphansberry@gunsandgit.com';
    
    console.log(`📧 Creating client for user: ${userEmail}`);
    const client = await makeGSuiteClientV2(userEmail);
    
    const testMessage = {
      message: `Integration test message from Google Chat service - ${new Date().toISOString()}`,
      channelId: 'spaces/AAQAq6CsEA0'
    };
    
    console.log('📨 Sending message:', testMessage.message);
    console.log('📍 To space:', testMessage.channelId);
    
    const result = await client.sendChatMessage(testMessage);
    
    console.log('✅ Message sent successfully!');
    console.log('📋 Result:', {
      messageId: result.messageId,
      timestamp: result.timestamp,
      success: result.success
    });
    
    // Verify the result
    expect(result.success).toBe(true);
    expect(result.messageId).toBeTruthy();
    expect(result.timestamp).toBeTruthy();
  }, 30000); // 30 second timeout for API calls
});