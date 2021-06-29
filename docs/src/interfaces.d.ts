export interface SliceyJson {
  general: SliceyJsonGeneral[]
  examples: SliceyJsonExample[]
  classes: SliceyJsonClass[]
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
  parameters: any[]
  properties: any[]
  methods: any[]
  events: any[]
}
