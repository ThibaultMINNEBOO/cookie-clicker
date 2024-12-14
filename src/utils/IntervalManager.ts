export class IntervalManager {
  private intervals: number[] = [];
  private static singleton: IntervalManager;

  addInterval(callback: () => void, ms: number) {
    const interval = setInterval(callback, ms);
    this.intervals.push(interval);
  }

  static getIntervalManager(): IntervalManager {
    if (!this.singleton) {
      this.singleton = new IntervalManager();
    }

    return this.singleton;
  }

  clearIntervals() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals = [];
  }
}
