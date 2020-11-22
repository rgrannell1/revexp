
export interface Every {
  every: any[]
}

export interface Digit {
  digit: {
    zero?: Boolean
  }
}

export interface Repeat {
  repeat: {
    value: Config,
    from?: number
    to?: number
  }
}

export interface OneOf {
  oneOf: Array<Config | string>
}

export interface NotOneOf {
  notOneOf: string[]
}

export interface Ref {
  ref: string
}

export interface Optional {
  optional: Config
}

export type Config =
  Digit |
  Every |
  Repeat |
  NotOneOf |
  OneOf |
  Optional |
  Ref |
  string

export type Stack = Config[]
export type Spec = {
  [key: string]: Config
}
