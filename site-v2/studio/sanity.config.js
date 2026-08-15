import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/index.js'

export default defineConfig({
  name: 'armd-studio',
  title: 'ARMD - Espace administrateur',

  projectId: '4jk93e7c',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu ARMD')
          .items([
            S.listItem()
              .title('Articles & Insights')
              .child(S.documentTypeList('article').title('Articles')),
            S.listItem()
              .title('Références clients')
              .child(S.documentTypeList('caseStudy').title('Références')),
            S.listItem()
              .title('Équipe')
              .child(S.documentTypeList('teamMember').title('Membres')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
