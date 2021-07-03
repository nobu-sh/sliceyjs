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
  properties: any[]
  methods: any[]
  events: any[]
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
