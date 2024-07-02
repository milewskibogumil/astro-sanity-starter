import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'
import { markdownSchema } from 'sanity-plugin-markdown'
import { CustomMarkdown } from './components/CustomMarkdown'
import { singletonActions, singletonTypes, structure } from './structure'

export default defineConfig({
  name: 'default',
  // This is the project title for the project you want to manage
  title: '',

  // This is the project ID for the project you want to manage
  projectId: '',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    media(),
    visionTool(),
    markdownSchema({ input: CustomMarkdown })
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
