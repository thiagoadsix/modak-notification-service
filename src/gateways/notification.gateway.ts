export class NotificationGateway {
  async send(userID: string, message: string): Promise<void> {
    console.log(`Sending message to user ${userID}: ${message}`);
  }
}
