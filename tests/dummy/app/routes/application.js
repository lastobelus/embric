// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return {
      startJSON: '{"objects":[{"type":"rect","originX":"left","originY":"top","left":331,"top":244,"width":50,"height":50,"fill":"#61e53d","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"rx":0,"ry":0},{"type":"triangle","originX":"left","originY":"top","left":306,"top":268,"width":50,"height":50,"fill":"#429371","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null}],"background":""}'
    };
  }

});
