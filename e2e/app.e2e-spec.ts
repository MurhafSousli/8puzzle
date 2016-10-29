import { PuzzlePage } from './app.po';

describe('puzzle App', function() {
  let page: PuzzlePage;

  beforeEach(() => {
    page = new PuzzlePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
