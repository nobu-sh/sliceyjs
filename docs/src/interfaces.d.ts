export interface SliceyJson {
  general: SliceyJsonGeneral[]
  examples: SliceyJsonExample[]
  classes: SliceyJsonClass[]
  typedefs: SliceyJsonTypedef[]
  [key: string]: any
}

export interface SliceyJsonGeneral {
  route: string,
  name: string,
}

export interface SliceyJsonExample {
  route: string,
  name: string,
}

export interface SliceyJsonClass {
  name: string
  route: string
  description: string
  extends?: {
    class: string
    link: string
  }
  constructorItem?: string
  parameters?: SliceyJsonClassParameter[]
  properties: SliceyJsonClassProperty[]
  methods: SliceyJsonClassMethod[]
  events: SliceyJsonClassEvent[]
}

export interface SliceyJsonClassProperty {
  name: string
  route: string
  static?: boolean
  readonly?: boolean
  type: {
    name: string
    link: string
  }
  description: string
}
export interface SliceyJsonClassMethod {
  name: string
  route: string
  description: string
  type: {
    name: string
    url: string
    promise?: boolean
  }
  parameters: SliceyJsonClassMethodParameter[]
}

export interface SliceyJsonClassMethodParameter {
  parameter: string
    description: string
    type: {
      name: string
      url: string
      params?: {
        name: string
        type: string
        url: string
      }[]
    }
} 

export interface SliceyJsonClassEvent {
  name: string
  route: string
  description: string
  parameters: SliceyJsonClassMethodParameter[]
}

export interface SliceyJsonClassParameter {
  parameter: string
  type: SliceyJsonClassParameterType
  optional: boolean
  default?: string
  description: string
}

export interface SliceyJsonClassParameterType {
  name: string
  url: string
}

export interface SliceyJsonTypedef {

}
