class ExecutionTime {
  private startTime: number | null = null;
  private endTime: number | null = null;

  constructor() {
    this.start();
  }

  /**
   * Start the timer.
   */
  public start(): void {
    if (this.startTime !== null) {
      throw new Error(
        'Timer has already started. Please stop the timer before starting it again.'
      );
    }

    this.startTime = performance.now() / 1000;
  }

  /**
   * Stop the timer.
   */
  public stop(): void {
    if (this.startTime === null) {
      throw new Error(
        'Timer has not been started. Please start the timer before stopping it.'
      );
    }

    this.endTime = performance.now() / 1000;
  }

  /**
   * Check if execution time is over the specified limit.
   *
   * @param second The time limit in seconds. Defaults to 1 second.
   */
  public isOverTime(second: number = 1): boolean {
    const currentTime = this.endTime ?? performance.now() / 1000;

    if (currentTime - (this.startTime as number) <= second) {
      return false;
    }

    console.warn(
      `${ExecutionTime.name}::isOverTime, Line 0: ${this.toString()}`
    );
    return true;
  }

  /**
   * Get the total execution time.
   */
  public toString(): string {
    const endTime = this.endTime ?? performance.now() / 1000;
    return (
      'Total execution time in seconds: ' +
      (endTime - (this.startTime as number)).toFixed(3)
    );
  }
}
