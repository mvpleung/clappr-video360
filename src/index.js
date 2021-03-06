
import kaleidoscopejs from 'kaleidoscopejs';
import {ContainerPlugin, Mediator, Events} from 'clappr';

export default class Video360 extends ContainerPlugin {
  constructor(container) {
    super(container);
    Mediator.on(`${this.options.playerId}:${Events.PLAYER_RESIZE}`, this.updateSize, this);
    let {height, width, autoplay} = container.options;
    container.playback.el.setAttribute('crossorigin', 'anonymous');
    container.el.style.touchAction = "none";
    container.el.addEventListener("touchmove", function(event) {
      event.preventDefault();
    }, false);
    this.viewer = new kaleidoscopejs.Video({height: isNaN(height) ? 300 : height, width: isNaN(width) ? 400 : width, container: this.container.el, source: this.container.playback.el});
    this.viewer.render();
  }

  get name() {
    return 'Video360';
  }

  updateSize() {
    setTimeout(() =>
      this.viewer.setSize({height: this.container.$el.height(), width: this.container.$el.width()})
    , 250)
  }
}
