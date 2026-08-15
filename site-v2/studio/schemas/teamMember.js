export default {
  name: 'teamMember',
  title: 'Membre équipe',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
    },
    {
      name: 'role',
      title: 'Fonction',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFounder',
      title: 'Fondateur',
      type: 'boolean',
      description: 'Cocher si membre fondateur (affichage prioritaire)',
      initialValue: false,
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Texte alternatif', type: 'string'}],
    },
    {
      name: 'bio',
      title: 'Biographie',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'credentials',
      title: 'Parcours / Titres',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ex: "Ancien Vinci Concessions", "Diplômé ESSEC"',
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Plus petit = affiché en premier',
      initialValue: 100,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Ordre personnalisé',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
}
