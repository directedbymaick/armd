export default {
  name: 'article',
  title: 'Article / Insight',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
      description: 'URL auto-générée depuis le titre. Cliquer sur "Generate".',
    },
    {
      name: 'tag',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Analyse', value: 'Analyse'},
          {title: 'Étude à paraître', value: 'Étude à paraître'},
          {title: 'Étude de fond', value: 'Étude de fond'},
          {title: 'Note méthodo', value: 'Note méthodo'},
          {title: 'Prise de parole', value: 'Prise de parole'},
          {title: 'Observatoire', value: 'Observatoire'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'readingTime',
      title: 'Temps de lecture (minutes)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(60),
    },
    {
      name: 'lead',
      title: 'Chapeau (intro)',
      type: 'text',
      rows: 3,
      description: 'Texte d\'introduction affiché en gros sous le titre.',
      validation: (Rule) => Rule.max(400),
    },
    {
      name: 'heroImage',
      title: 'Image principale',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Texte alternatif', type: 'string'},
      ],
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'object',
      fields: [
        {name: 'name', title: 'Nom', type: 'string'},
        {name: 'role', title: 'Fonction', type: 'string'},
        {name: 'photo', title: 'Photo', type: 'image'},
      ],
    },
    {
      name: 'body',
      title: 'Contenu de l\'article',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Paragraphe', value: 'normal'},
            {title: 'Sous-titre H2', value: 'h2'},
            {title: 'Sous-titre H3', value: 'h3'},
            {title: 'Citation', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Gras', value: 'strong'},
              {title: 'Italique', value: 'em'},
            ],
          },
          lists: [{title: 'Puces', value: 'bullet'}],
        },
        {type: 'image', options: {hotspot: true}},
      ],
    },
    {
      name: 'pullquote',
      title: 'Citation en exergue (optionnel)',
      type: 'text',
      rows: 2,
      description: 'Phrase clé mise en avant au milieu de l\'article.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tag',
      media: 'heroImage',
    },
  },
  orderings: [
    {
      title: 'Date (plus récent)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
}
