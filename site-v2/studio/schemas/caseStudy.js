export default {
  name: 'caseStudy',
  title: 'Référence client',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre du cas',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sector',
      title: 'Secteur',
      type: 'string',
      description: 'Ex: Fintech, Institutionnel, Tech/Énergie',
    },
    {
      name: 'mission',
      title: 'Mission',
      type: 'string',
      description: 'Ex: Communication corporate, Personal branding',
    },
    {
      name: 'period',
      title: 'Période',
      type: 'string',
      description: 'Ex: "Depuis oct. 2025", "8 mois - 2024"',
    },
    {
      name: 'pillars',
      title: 'Piliers ARMD mobilisés',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Donnée', value: 'Donnée'},
          {title: 'Récit', value: 'Récit'},
          {title: 'Humain', value: 'Humain'},
        ],
      },
    },
    {
      name: 'metric',
      title: 'Chiffre clé (mise en avant)',
      type: 'object',
      fields: [
        {name: 'value', title: 'Valeur', type: 'string', description: 'Ex: "115M+", "72h"'},
        {name: 'label', title: 'Description', type: 'string', description: 'Ex: "Visiteurs mensuels"'},
      ],
    },
    {
      name: 'heroImage',
      title: 'Image principale',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Texte alternatif', type: 'string'}],
    },
    {
      name: 'summary',
      title: 'Résumé (affiché sur la carte)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'context',
      title: 'Le contexte',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'challenge',
      title: 'L\'enjeu',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'approach',
      title: 'L\'approche ARMD',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Paragraphe', value: 'normal'},
            {title: 'Sous-titre H3', value: 'h3'},
            {title: 'Citation', value: 'blockquote'},
          ],
        },
      ],
    },
    {
      name: 'results',
      title: 'Résultats (chiffres)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Chiffre', type: 'string', description: 'Ex: "10+", "115M+"'},
            {name: 'label', title: 'Description', type: 'string'},
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        },
      ],
    },
    {
      name: 'relatedCases',
      title: 'Cas connexes (2 max)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
      validation: (Rule) => Rule.max(2),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sector',
      media: 'heroImage',
    },
  },
}
