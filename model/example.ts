import { CanvasElement } from './element'
import { getComponentById } from './library'

export const exampleModel: CanvasElement[] = [
  {
    id: 1,
    component: getComponentById('VCard'),
    props: {},
    children: [
      {
        id: 2,
        component: getComponentById('VContainer'),
        props: {},
        children: [
          {
            id: 3,
            component: getComponentById('VRow'),
            props: {},
            children: [
              {
                id: 4,
                component: getComponentById('VCol'),
                props: {},
                children: [],
              },
              {
                id: 5,
                component: getComponentById('VCol'),
                props: {},
                children: [],
              },
            ],
          },
          {
            id: 6,
            component: getComponentById('VRow'),
            props: {},
            children: [
              {
                id: 7,
                component: getComponentById('VCol'),
                props: {},
                children: [
                  {
                    id: 8,
                    component: getComponentById('Text'),
                    props: {},
                    children: [],
                  },
                ],
              },
              {
                id: 9,
                component: getComponentById('VCol'),
                props: {},
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]
