import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found';

interface ICancelNotificationRequest {
  notificationId: string;
}

type TCancelNotificationResponse = void;
@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ICancelNotificationRequest,
  ): Promise<TCancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound()
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
