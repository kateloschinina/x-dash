const path = require('path');

module.exports = {
	pathPrefix: '/x-dash',
	siteMetadata: {
		title: 'Gatsby Default Starter',
	},
	plugins: [
		'gatsby-plugin-react-next',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-packages',
		{
			resolve: 'gatsby-plugin-sass',
			options: {
				includePaths: path.resolve(__dirname, 'bower_components')
			}
		},
		'gatsby-plugin-munge-pages',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					'gatsby-remark-prismjs',
					'gatsby-remark-autolink-headers',
					'gatsby-remark-external-links',
					'gatsby-remark-emoji',
					'gatsby-remark-file-links',
				],
			},
		},
		'gatsby-plugin-doc-pages',
		{
			resolve: '@andrew-codes/gatsby-plugin-elasticlunr-search',
			options: {
				fields: [
					'title',
					'plainText',
				],
				resolvers: {
					MarkdownRemark: {
						title: node => node.frontmatter.title,
						plainText: node => node.plainText,
						href: node => node.frontmatter.path,
						breadcrumbs: node => node.frontmatter.breadcrumbs,
					}
				}
			}
		}
	]
};
