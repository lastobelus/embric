export default function animDissolveAway(canvas, object, duration = 250, howSmall = 8) {
  return [
    {
      opacity: 0,
      scaleX: object.getScaleX() / howSmall,
      scaleY: object.getScaleY() / howSmall
    },
    {
      easing: window.fabric.util.ease.easeInBack,
      duration,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: canvas.remove.bind(canvas, object)
    }
  ];
}
