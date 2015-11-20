import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    moveSelectionForward() {
      let selection = this.get('selection');
      console.log('selection', selection);
      if (selection.get('isSingle')) {
        selection.get('selection').bringForward();
      }
    },
    moveSelectionToFront() {
      let selection = this.get('selection');
      if (selection.get('isSingle')) {
        selection.get('selection').bringToFront();
      }
    },
    moveSelectionBackward() {
      let selection = this.get('selection');
      if (selection.get('isSingle')) {
        selection.get('selection').sendBackwards();
      }

    },
    moveSelectionToBack() {
      let selection = this.get('selection');
      if (selection.get('isSingle')) {
        selection.get('selection').sendToBack();
      }
    }
  }

});
