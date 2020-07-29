import { container } from 'tsyringe'

import RedisCacheProvider from './implementations/RedisCacheProvider'
import iCacheProvider from './models/iCacheProvider'

const providers = {
  redis: RedisCacheProvider,
}

container.registerSingleton<iCacheProvider>('CacheProvider', providers.redis)
