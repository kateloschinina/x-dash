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
	type: 'paid-post',
	id: '',
	url: '#',
	title: 'Why eSports companies are on a winning streak',
	standfirst: 'ESports is big business and about to get bigger: global revenues could hit $1.5bn by 2020',
	promotedPrefix: 'Paid post',
	promotedSuffix: 'by UBS',
	image: {
		url: 'https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKCrm_3yahABGAEyCMx3RoLss603',
		width: 700,
		height: 394
	}
};

exports.stories = {

	'Paid Post' ({ createProps }) {
		const props = createProps([
			'id',
			'url',
			'type',
			// Meta
			'showMeta',
			'promotedPrefix',
			'promotedSuffix',
			// Title
			'showTitle',
			'title',
			// Standfirst
			'showStandfirst',
			'standfirst',
			// Image
			'showImage',
			'image',
			'imageSize'
		]);

		return h(Teaser, Object.assign({layout: 'small'}, props));
	}
};

exports.knobs = require('./knobs');

exports.module = module;