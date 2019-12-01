import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { styleMap } from 'lit-html/directives/style-map.js';

export class MoveBox extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      .movale {
        position: absolute;
      }
      .resizable {
        resize: both;
        overflow: auto;
      }
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
    this.styles = {};
  }

  __onMouseDown(e) {
    this.__isMouseDown = true;
    this.__offset = [this.offsetLeft - e.clientX, this.offsetTop - e.clientY];
  }

  __onMouseMove(e) {
    e.preventDefault();

    if (this.isMouseDown) {
      this.updateStyle({
        x: e.clientX + this.__offset[0],
        y: e.clientY + this.__offset[1],
      });
    }
  }

  __onMouseUp() {
    this.__isMouseDown = false;
  }

  updateStyle(styles) {
    this.styles = styles;
  }

  connectedCallback() {
    if (this.movable) {
      this.addEventListener('mousedown', this.__onMouseDown, true);
      this.addEventListener('mousemove', this.__onMouseMove, true);
      this.addEventListener('mouseup', this.__onMouseUp, true);
    }
  }

  disconnectedCallback() {
    if (this.movable) {
      this.removeEventListener('mousedown', this.__onMouseDown);
      this.removeEventListener('mousemove', this.__onMouseMove);
      this.removeEventListener('mouseup', this.__onMouseUp);
    }
  }

  render() {
    return html`
      <div
        class=${classMap({ movable: this.movable, resizable: this.resizable })}
        style=${styleMap(this.styles)}
      >
        <slot />
      </div>
    `;
  }
}
