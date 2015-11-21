import Ember from 'ember';

export default Ember.Mixin.create({
  defaultDimension: 50,
  canvas: Ember.computed('editor.canvas', {
    get() {
      return this.get('editor..canvas');
    }
  }),
  actions: {
    addShape(shape) {
      console.log('addShape: ', shape);
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
        opacity: selection.get('opacity') || this.get('defaultProperties.opacity') || 1.0
      };

      canvas.deactivateAll();

      let obj;

      switch (shape) {
      case 'rect':
        props.width = defaultDimension;
        props.height = defaultDimension;
        obj = new window.fabric.Rect(props);
        break;
      case 'circle':
        props.radius = defaultDimension / 2.0;
        obj = new window.fabric.Circle(props);
        break;
      case 'triangle':
        props.width = defaultDimension;
        props.height = defaultDimension;
        obj = new window.fabric.Triangle(props);
        break;
      default:

      }

      if (obj) {
        canvas.add(obj).centerObject(obj);
        obj.setCoords();
        canvas.setActiveObject(obj);
        editor.updateSelection();
      }
    }
  }

});
