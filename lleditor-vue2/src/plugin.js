import Vue, { version as vueVersion } from 'vue';
import LLEditorComponent from './lleditor';

/* istanbul ignore next */
const version = Vue ? Vue.version : vueVersion;
const [ major ] = version.split( '.' ).map( i => parseInt( i, 10 ) );

/* istanbul ignore if */
if ( major !== 2 ) {
	throw new Error(
		'The LLEditor plugin works only with Vue 2.x. '
	);
}

const LLEditor = {
	/**
	 * Installs the plugin, registering the `<LLEditor>` component.
	 *
	 * @param {Vue} Vue The Vue object.
	 */
	install( Vue ) {
		Vue.component( 'LLEditor', LLEditorComponent );
	},
	component: LLEditorComponent
};

export default LLEditor;