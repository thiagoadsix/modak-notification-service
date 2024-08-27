export interface NotificationService {
  send(type: string, userId: string, message: string): void;
}
