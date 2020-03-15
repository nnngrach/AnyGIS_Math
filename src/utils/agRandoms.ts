class AgRandoms {

    static randomIntFromZeroToMaxValue(maxValue: number): number {
        return Math.floor(Math.random() * maxValue);
    }

    static randomArrayItem<T>(array: T[]): T {
        return array[this.randomIntFromZeroToMaxValue(array.length)];
    }
}


export default AgRandoms;