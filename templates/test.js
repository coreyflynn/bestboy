
describe('{{ describe }}', () => {
  it('should match snapshot', () => {
    const props = {{{ props }}};
    const tree = renderer
      .create(Wrapper(<Component {...props} />))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
