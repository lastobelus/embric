import Ember from 'ember';

export default Ember.Mixin.create({
  defaultFontSize: 40,
  canvas: Ember.computed('editor.canvas', {
    get() {
      return this.get('editor..canvas');
    }
  }),
  selectionIsText: Ember.computed('editor.selection.type', {
    get() {
      return this.get('editor.selection.type') === 'text';
    }
  }),
  actions: {
    setText(text) {
      this.set('text', text);
      if (this.get('selectionIsText')) {
        let selection = this.get('editor.selection');
        selection.set('text', this.get('text'));
      }
    },
    addOrSetStaticText(text, selectedFont) {
      console.log('addText: ', text, selectedFont);
      let editor = this.get('editor');
      let selection = this.get('editor.selection');
      if (!text) {
        return;
      }
      let canvas = this.get('canvas');
      let defaultFontSize = this.get('defaultFontSize');

      let props = {
        left: 0,
        top: 0,
        fill: selection.get('fill') || this.get('defaultProperties.fill') || 'black',
        stroke: selection.get('stroke'),
        strokeWidth: selection.get('strokeWidth'),
        opacity: selection.get('opacity') || this.get('defaultProperties.opacity') || 1.0,
        fontFamily: selectedFont || selection.get('fontFamily') || 'Verdana',
        fontSize: selection.get('fontSize') || defaultFontSize
      };

      canvas.deactivateAll();

      let obj = new window.fabric.Text(text, props);
      canvas.add(obj).centerObject(obj);
      obj.setCoords();
      canvas.setActiveObject(obj);
      editor.updateSelection();
    }
  }

});
