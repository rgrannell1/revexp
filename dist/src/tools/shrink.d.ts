export interface ShrinkOpts {
    test: Function;
    gen: Function;
    all: Boolean;
    until: Function;
}
declare const shrink: {
    ({ test, gen, all, until }: ShrinkOpts): never[] | null;
    until: {
        count: (target: number) => (count: number) => boolean;
        timeElapsed: (target: number) => (count: number, start: number) => boolean;
    };
};
export default shrink;
