import { BaseCacheManager } from '@/libs/cache-manager/base-cache-manager';
import { City } from '@/types/City';

export class CacheManager extends BaseCacheManager {
  setCities<Value> (value: Value){
    this.set(this.keys.cities.name, value);
  }
  getCities() {
    this.get<City[]>(this.keys.cities.name);
  }
}
