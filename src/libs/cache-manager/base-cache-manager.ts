export class BaseCacheManager {
  protected manager = localStorage;

  protected keys = {
    cities: 'CITIES',
  };

  protected set<Value>(key: keyof typeof this.keys, value: Value) {
    this.manager.setItem(key, value);
  }
  protected get(key: keyof typeof this.keys) {
    this.manager.getItem(key);
  }
  protected remove(key: keyof typeof this.keys) {
    this.manager.removeItem(key);
  }
}
