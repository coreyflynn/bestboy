describe('Foo', () => {
  it('should match base snapshot', () => {
    const props = {"foo":{"bar":{"wat":1}}};
    expect(shallow(<Component {...props}/>).html()).toMatchSnapshot();
  });
});
