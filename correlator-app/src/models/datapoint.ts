export type TrackingPeriod = {
  start: Date;
  end?: Date;
};

export type DatapointResult = {
  timestamp: Date;
  result: any;
};

export type DatapointHistory = {
  results: DatapointResult[];
  trackingPeriods: TrackingPeriod[];
};

export class Datapoint {
  name: string;
  type: string;
  color: string;
  config: Record<string, any>;
  history: DatapointHistory;

  constructor({
    name,
    type,
    color,
    config,
    history
  }: {
    name: string;
    type: string;
    color: string;
    config?: Record<string, any>;
    history?: DatapointHistory;
  }) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.config = config ?? {};
    this.history = history ?? {
        results: [],
        trackingPeriods: [{ start: new Date() }]
    };
  }

  public created(): Date | null {
    if (this.history.trackingPeriods.length === 0) return null;
    return this.history.trackingPeriods[0].start;
  }

  public isTrackingOn(date: Date): boolean {
    return this.history.trackingPeriods.some((period) => {
      const start = period.start;
      // Assume "now" if no end
      const end = period.end ?? new Date();
      return date >= start && date <= end;
    });
  }

  // For CalendarScreen usage
  public getMarkedDates(): Record<string, any> {
    const marked: Record<string, any> = {};

    for (const period of this.history.trackingPeriods) {
      const range = this.getDateRange(period.start, period.end ?? new Date());

      for (let i = 0; i < range.length; i++) {
        const dateStr = this.formatDate(range[i]);

        marked[dateStr] = marked[dateStr] || { periods: [] };

        marked[dateStr].periods.push({
          startingDay: i === 0,
          endingDay: i === range.length - 1
        });
      }
    }

    return marked;
  }

  private formatDate(date: Date): string {
    // YYYY-MM-DD
    return date.toISOString().split('T')[0];
  }

  private getDateRange(start: Date, end: Date): Date[] {
    const days: Date[] = [];
    let current = new Date(start);
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }
}
