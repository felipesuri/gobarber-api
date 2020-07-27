import { getMongoRepository, MongoRepository } from 'typeorm'

import iCreateNotificationDTO from '@modules/notifications/dtos/iCreateNotificationDTO'
import iNotificationsRepository from '@modules/notifications/repositories/iNotificationsRepository'
import Notification from '../schemas/notification'

class NotificationsRepository implements iNotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({
    content,
    recipient_id,
  }: iCreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id })

    await this.ormRepository.save(notification)

    return notification
  }
}

export default NotificationsRepository
