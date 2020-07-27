import iCreateNotificationDTO from '../dtos/iCreateNotificationDTO'
import Notification from '../infra/typeorm/schemas/notification'

export default interface iNotificationsRepository {
  create(data: iCreateNotificationDTO): Promise<Notification>
}
