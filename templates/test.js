
describe('{{ describe }}', () => {
  it('should match snapshot', () => {
    const props = {{{ props }}};
    expect(shallow(<Component {...props}/>).html()).toMatchSnapshot();
  });
});
