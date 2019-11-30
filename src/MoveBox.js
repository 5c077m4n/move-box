import { html, css, LitElement } from 'lit-element';

export class MoveBox extends LitElement {
  static get styles() {
    return css`
      position: absolute;
      resize: both;
      overflow: auto;
    `;
  }

  static get properties() {
    return {
      movable: { type: Boolean },
      resizable: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.__isMouseDown = false;
    this.__offset = [0, 0];
  }

  __onMouseDown(e) {
    this.__isMouseDown = true;
    this.__offset = [this.offsetLeft - e.clientX, this.offsetTop - e.clientY];
  }

  __onMouseMove(e) {
    e.preventDefault();

    if (this.isMouseDown) {
      updateStyle(this, {
        x: event.clientX + this.__offset[0],
        y: event.clientY + this.__offset[1],
      });
    }
  }

  __onMouseUp() {
    this.__isMouseDown = false;
  }

  firstUpdated() {
    if (this.movable) {
      this.addEventListener('mousedown', this.__onMouseDown, true);
      this.addEventListener('mousemove', this.__onMouseMove, true);
      this.addEventListener('mouseup', this.__onMouseUp, true);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('mousedown', this.__onMouseDown);
    this.removeEventListener('mousemove', this.__onMouseMove);
    this.removeEventListener('mouseup', this.__onMouseUp);
  }

  render() {
    return html`
      <slot />
    `;
  }
}
