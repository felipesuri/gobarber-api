import { ObjectID } from 'mongodb'

import iCreateNotificationDTO from '@modules/notifications/dtos/iCreateNotificationDTO'
import iNotificationsRepository from '@modules/notifications/repositories/iNotificationsRepository'
import Notification from '../../infra/typeorm/schemas/notification'

class NotificationsRepository implements iNotificationsRepository {
  private notifications: Notification[] = []

  public async create({
    content,
    recipient_id,
  }: iCreateNotificationDTO): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, { id: new ObjectID(), content, recipient_id })

    this.notifications.push(notification)

    return notification
  }
}

export default NotificationsRepository
