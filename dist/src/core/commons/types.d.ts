export interface Every {
    every: any[];
}
export interface Digit {
    digit: {
        zero?: Boolean;
    };
}
export interface Repeat {
    repeat: {
        value: Config;
        from?: number;
        to?: number;
    };
}
export interface OneOf {
    oneOf: Array<Config | string>;
}
export interface NotOneOf {
    notOneOf: string[];
}
export interface Ref {
    ref: string;
}
export interface Optional {
    optional: Config;
}
export declare type Config = Digit | Every | Repeat | NotOneOf | OneOf | Optional | Ref | string;
export declare type Stack = Config[];
export declare type Spec = {
    [key: string]: Config;
};
