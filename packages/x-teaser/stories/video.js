const {Teaser} = require('../');
const h = require('@financial-times/x-engine');

exports.title = 'Teaser';

exports.fixture = {
	type: 'video',
	id: '',
	url: '#',
	title: 'FT View: Donald Trump, man of steel',
	standfirst: 'The FT\'s Rob Armstrong looks at why Donald Trump is pushing trade tariffs',
	publishedDate: '2018-03-26T08:12:28.137Z',
	firstPublishedDate: '2018-03-26T08:12:28.137Z',
	conceptPrefix: '',
	conceptSuffix: '',
	concept: {
		url: '#',
		prefLabel: 'Global Trade'
	},
	alternativeConcept: {
		url: '#',
		prefLabel: 'US'
	},
	image: {
		url: 'http://com.ft.imagepublish.upp-prod-eu.s3.amazonaws.com/a27ce49b-85b8-445b-b883-db6e2f533194',
		width: 1920,
		height: 1080,
		aspectRatio: 0.5625
	},
	imageSize: 'Small'
};

exports.stories = {

	Video ({ createProps}) {
		const props = createProps([
			// Core content
			'id',
			'url',
			'type',
			'title',
			'standfirst',
			'publishedDate',
			'firstPublishedDate',
			'conceptPrefix',
			'concept',
			'conceptSuffix',
			'image',
			// Variant options
			'layout',
			'modifiers',
			// Features
			'showConcept',
			'showTitle',
			'showStandfirst',
			'showStatus',
			'showImage',
			// Feature options
			'useRelativeTime',
			'imageSize'
		]);

		return <Teaser {...props} />;
	}
};

exports.knobs = require('./knobs');

exports.module = module;
