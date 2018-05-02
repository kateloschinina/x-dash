const path = require('path');
const titleCase = require('title-case');
const findUp = require('find-up');
const removeMarkdown = require('remove-markdown');
const minimatch = require('minimatch');

const repoBase = path.dirname(findUp.sync('lerna.json'));

const closestDir = (dir, match) => !dir || dir === '/'
	? false
	: (match instanceof RegExp ? dir.match(match) : minimatch(dir, match))
		? dir
		: closestDir(path.dirname(dir), match);

exports.onCreateNode = ({node}) => {
	if(node.internal.type === 'MarkdownRemark') {
		const {packages: packageGlobs} = require(
			path.resolve(repoBase, 'lerna.json')
		);

		const absoluteGlobs = packageGlobs.map(
			g => path.resolve(repoBase, g)
		);

		const fullGlob = absoluteGlobs.length > 1
			? `{${absoluteGlobs.join(',')}}`
			: absoluteGlobs[0];

		const docsFolder = closestDir(node.fileAbsolutePath, /(src)?\/docs$/);
		const pkgFolder = closestDir(docsFolder || node.fileAbsolutePath, fullGlob);

		const pkg = path.basename(pkgFolder);
		const root = path.basename(path.dirname(pkgFolder));

		const rel = path.relative(
			docsFolder || pkgFolder,
			node.fileAbsolutePath
		).replace(/\.\w+$/, '').replace(/(readme|index)$/, '');

		if(!node.frontmatter.title) {
			node.frontmatter.title = rel !== ''
				? titleCase(path.basename(rel))
				: pkg;
		}

		const namespace = root === 'components'
			? 'Components'
			: 'Packages';

		if(!node.frontmatter.path) {
			node.frontmatter.path = pkg === 'x-docs' && rel !== ''
				? `/${rel}`
				: `/${namespace.toLowerCase()}/${pkg}/${rel}`;
		}

		if(!node.frontmatter.breadcrumbs) {
			const crumbs = rel.split('/').map(titleCase).filter(a => a);

			node.frontmatter.breadcrumbs = pkg === 'x-docs' && rel !== ''
				? crumbs
				: [namespace, pkg, ...crumbs]
		}

		if(!node.fields || !node.fields.slug) {
			node.fields = Object.assign({}, node.fields, {
				slug: node.frontmatter.path
			});
		}

		node.plainText = removeMarkdown(node.internal.content).replace(/\n/g, '');
	}

	return node;
};

exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators;

	const blogPostTemplate = path.resolve(`src/templates/blog.js`);

	return graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						frontmatter {
							path
							title
							breadcrumbs
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			return Promise.reject(result.errors);
		}

		result.data.allMarkdownRemark.edges.forEach(({ node }) => {
			createPage({
				path: node.frontmatter.path,
				component: blogPostTemplate,
				context: {
					sitemap: {
						title: node.frontmatter.title,
						breadcrumbs: node.frontmatter.breadcrumbs,
					}
				},
			});
		});
	});
};