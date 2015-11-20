// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return {
      startJSON: '{"objects":[{"type":"rect","originX":"center","originY":"center","left":369,"top":169,"width":50,"height":50,"fill":"#61e53d","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"rect","originX":"center","originY":"center","left":418.59,"top":125.59,"width":50,"height":50,"fill":"purple","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.82,"scaleY":1.82,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"triangle","originX":"center","originY":"center","left":389,"top":177,"width":50,"height":50,"fill":"#429371","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over"}],"background":""}'
    };
  }

});
