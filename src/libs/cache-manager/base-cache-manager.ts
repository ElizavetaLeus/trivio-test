export interface CacheItem<T> {
  ended: number;
  value: T;
}
export class BaseCacheManager {
  protected manager = localStorage;

  protected ONE_SECOND = 1000; // mile second
  protected ONE_HOUR = this.ONE_SECOND * 60 * 60;
  protected ONE_DAY = this.ONE_HOUR * 24;
  protected DAY_30 = this.ONE_DAY * 30;
  protected SAVE_DEFAULT = this.ONE_HOUR;

  protected keys = {
    cities: {
      name: 'CITIES',
      save: this.ONE_DAY,
    },
  };

  protected set<Value>(keyName: keyof typeof this.keys, value: Value) {
    const timeLimit = new Date().getTime() + this.keys[keyName].save;
    this.manager.setItem(keyName, JSON.stringify({
      ended: timeLimit,
      value: value,
    }));
  }
  protected get<T>(key: keyof typeof this.keys) {
    const itemBase = this.manager.getItem(keyName);
    if (itemBase !== null) {
      const item: CacheItem<T> = JSON.parse(itemBase);
      if (item.ended > new Date().getTime()) {
        return item.value;
      } else {
        this.remove(key);
      }
    }
  }
  protected remove(key: keyof typeof this.keys) {
    this.manager.removeItem(key);
  }
}
