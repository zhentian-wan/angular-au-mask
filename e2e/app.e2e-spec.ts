import { AuMaskPage } from './app.po';

describe('au-mask App', () => {
  let page: AuMaskPage;

  beforeEach(() => {
    page = new AuMaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
