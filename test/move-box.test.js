import { html, fixture, expect } from '@open-wc/testing';

import '../move-box.js';

describe('MoveBox', () => {
  it('can override the title via attribute', async () => {
    const el = await fixture(html`
      <move-box title="attribute title"></move-box>
    `);

    expect(el.title).to.equal('attribute title');
  });

  it('shows initially the text "hey there Nr. 5!" and an "increment" button', async () => {
    const el = await fixture(html`
      <move-box></move-box>
    `);

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <move-box></move-box>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
