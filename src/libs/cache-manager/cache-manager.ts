import { BaseCacheManager } from '@/libs/cache-manager/base-cache-manager';

export class CacheManager extends BaseCacheManager {
  setCities<Value> (value: Value){
    this.set(this.keys.cities, value);
  }
  getCities() {
    this.get(this.keys.cities);
  }
}
