const { Teaser } = require('../');
const h = require('@financial-times/x-engine');

exports.component = 'x-teaser';

exports.origamiDependencies = {
	'o-fonts': '^3',
	'o-typography': '^5.5.0',
	'o-teaser': '^2.2.0',
	'o-labels': '^3.0.0',
};

exports.fixture = {
	type: 'article',
	id: '',
	url: '#',
	title: 'Inside charity fundraiser where hostesses are put on show',
	alternativeTitle: 'Men Only, the charity fundraiser with hostesses on show',
	standfirst: 'FT investigation finds groping and sexual harassment at secretive black-tie dinner',
	alternativeStandfirst: 'Groping and sexual harassment at black-tie dinner charity event',
	publishedDate: '2018-01-23T15:07:00.000Z',
	firstPublishedDate: '2018-01-23T13:53:00.000Z',
	conceptPrefix: '',
	conceptSuffix: '',
	concept: {
		url: '#',
		prefLabel: 'Sexual misconduct allegations'
	},
	alternativeConcept: {
		url: '#',
		prefLabel: 'FT Investigations'
	},
	image: {
		url: 'http://prod-upp-image-read.ft.com/a25832ea-0053-11e8-9650-9c0ad2d7c5b5',
		width: 2048,
		height: 1152
	},
	related: [
		{
			id: '',
			url: '#',
			type: 'article',
			title: 'Removing the fig leaf of charity'
		},
		{
			id: '',
			url: '#',
			type: 'article',
			title: 'A dinner that demeaned both women and men'
		},
		{
			id: '',
			url: '#',
			type: 'video',
			title: 'PM speaks out after Presidents Club dinner'
		}
	]
};

exports.stories = {

	'Top Story' ({ createProps }) {
		const props = createProps([
			'id',
			'url',
			'type',
			// Meta
			'showMeta',
			'conceptPrefix',
			'concept',
			'conceptSuffix',
			// Title
			'showTitle',
			'title',
			// Standfirst
			'showStandfirst',
			'standfirst',
			// Status
			'showStatus',
			'publishedDate',
			'firstPublishedDate',
			'useRelativeTime',
			// Image
			'showImage',
			'image',
			// Related
			'showRelated',
			'related',
		]);

		return h(Teaser, Object.assign({layout: 'top-story', modifiers: ['landscape'], imageSize: 'XL'}, props));
	}
};

exports.knobs = require('./knobs');

exports.module = module;