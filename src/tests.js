import {tgtrimm} from './getWikiData';
import {getQueryTime} from './getQueryTime';

export function tests() {
	QUnit.test( "update string", function(assert) {
		assert.equal(tgtrimm('strin#g'), 'string' );
		assert.equal(tgtrimm('!@s#$%tr^&*i&*(n#g)'), 'string' );
		assert.equal(tgtrimm('str-in-g'), 'str-in-g' );
		assert.equal(tgtrimm('str147`ing str-ng'), 'string str-ng' );
	});
	QUnit.test( "update date", function(assert) {
		const date1 = new Date(2011, 0, 1, 12, 34, 0, 0);
		const date2 = new Date(2013, 11, 26);
		const date3 = new Date(1356, 0, 1, 0, 7);
		assert.equal(getQueryTime(date1), '01.01.2011 12:34' );
		assert.equal(getQueryTime(date2), '26.12.2013 00:00' );
		assert.equal(getQueryTime(date3), '01.01.1356 00:07' );
	});
}