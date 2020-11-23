export declare const string: {
    every: (string | {
        repeat: {
            value: {
                notOneOf: string[];
            };
            from: number;
            to: number;
        };
    })[];
};
export declare const whitespace: {
    oneOf: string[];
};
export declare const number: {
    every: ({
        digit: {
            zero: boolean;
        };
        repeat?: undefined;
        optional?: undefined;
    } | {
        repeat: {
            value: {
                digit: {};
            };
            from: number;
            to: number;
        };
        digit?: undefined;
        optional?: undefined;
    } | {
        optional: {
            every: (string | {
                repeat: {
                    value: {
                        digit: {};
                    };
                    from: number;
                    to: number;
                };
            })[];
        };
        digit?: undefined;
        repeat?: undefined;
    })[];
};
export declare const exponent: {
    every: ({
        digit: {
            zero: boolean;
        };
        repeat?: undefined;
        optional?: undefined;
    } | {
        repeat: {
            value: {
                digit: {};
            };
            from: number;
            to: number;
        };
        digit?: undefined;
        optional?: undefined;
    } | {
        optional: {
            every: (string | {
                repeat: {
                    value: {
                        digit: {};
                    };
                    from: number;
                    to: number;
                };
            })[];
        };
        digit?: undefined;
        repeat?: undefined;
    } | {
        oneOf: string[];
    })[];
};
export declare const array: {
    every: (string | {
        optional: {
            every: ({
                ref: string;
                repeat?: undefined;
            } | {
                repeat: {
                    value: {
                        every: (string | {
                            ref: string;
                        })[];
                    };
                    from: number;
                    to: number;
                };
                ref?: undefined;
            })[];
        };
    })[];
};
export declare const property: {
    ref: string;
};
export declare const object: {
    every: (string | {
        optional: {
            every: (string | {
                ref: string;
                repeat?: undefined;
            } | {
                repeat: {
                    value: {
                        every: (string | {
                            ref: string;
                        })[];
                    };
                    from: number;
                    to: number;
                };
                ref?: undefined;
            })[];
        };
    })[];
};
export declare const value: {
    oneOf: (string | {
        ref: string;
    })[];
};
