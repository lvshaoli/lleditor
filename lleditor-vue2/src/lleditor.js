
import MyEditor from "ll-editor";
// import MyEditor from "../../packages/my-editor/dist/index";
import { debounce } from 'lodash-es';

const INPUT_EVENT_DEBOUNCE_WAIT = 300;
export default {
    name: "LLEditor",
    render(createElement) {
        return createElement(this.tagName)
    },

	props: {
		editor: {
			type: Function,
			default: null
		},
		value: {
			type: String,
			default: ''
		},
		config: {
			type: Object,
			default: () => ( {} )
		},
		tagName: {
			type: String,
			default: 'div'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
    data() {
		return {
			$_instance: null,
            currentEditor: null,
			$_lastEditorData: {
				type: String,
				default: ''
			}
		};
	},
    mounted() {
		const editorConfig = Object.assign( {}, this.config );

		if ( this.value ) {
			editorConfig.initialData = this.value;
		}
       this.currentEditor = new MyEditor({
			el: this.$el,
            disabled: this.disabled,
            editorConfig,
            ready: (editor) => {
                this.$_instance = editor;
				this.$_setUpEditorEvents();
				this.$emit( 'ready', editor );
            }
        });
	},
    watch: {
		value( newValue, oldValue ) {
			if ( newValue !== oldValue && newValue !== this.$_lastEditorData ) {
				this.$_instance.setData( newValue );
			}
		},
		disabled( val ) {
			this.$_instance.isReadOnly = val;
		}
	},
    methods: {
		$_setUpEditorEvents() {
			const editor = this.$_instance;
			const emitDebouncedInputEvent = debounce( evt => {
				const data = this.$_lastEditorData = editor.getData();

				this.$emit( 'input', data, evt, editor );
			}, INPUT_EVENT_DEBOUNCE_WAIT, { leading: true } );

			editor.model.document.on( 'change:data', emitDebouncedInputEvent );

			editor.editing.view.document.on( 'focus', evt => {
				this.$emit( 'focus', evt, editor );
			} );

			editor.editing.view.document.on( 'blur', evt => {
				this.$emit( 'blur', evt, editor );
			} );
		}
	},
    beforeDestroy() {
		if ( this.$_instance ) {
			this.$_instance.destroy();
			this.$_instance = null;
		}
        if (this.currentEditor) {
            this.currentEditor.destroy();
            this.currentEditor = null;
        }
		this.$emit( 'destroy', this.$_instance );
	},


}