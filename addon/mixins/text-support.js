import Ember from 'ember';

export default Ember.Mixin.create({
  canvas: Ember.computed('editor.canvas', {
    get() {
      return this.get('editor..canvas');
    }
  }),
  actions: {
    addStaticText(text, selectedFont) {
      console.log('addText: ', text, selectedFont);
      if (!text) {
        return;
      }
      let canvas = this.get('canvas');
      let editor = this.get('editor');
      let selection = this.get('editor.selection');
      let defaultDimension = this.get('defaultDimension');

      let props = {
        left: 0,
        top: 0,
        fill: selection.get('fill') || this.get('defaultProperties.fill') || 'black',
        stroke: selection.get('stroke'),
        strokeWidth: selection.get('strokeWidth'),
        opacity: selection.get('opacity') || this.get('defaultProperties.opacity') || 1.0,
        fontFamily: selectedFont || selection.get('fontFamily') || "Verdana",
        fontSize: selection.get('fontSize') || 40
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
