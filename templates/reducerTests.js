

describe('{{ import }}', () => {
  it('should modify the reducer state', () => {
    {{#if payload}}
      expect(reducer(undefined, {{ import }}({{{ payload.input }}}))).not.toEqual(defaultState);
    {{else}}
      expect(reducer(undefined, {{ import }}())).not.toEqual(defaultState);
    {{/if}}
  });

  it('should match snapshot', () => {
    {{#if payload}}
      expect(reducer(undefined, {{ import }}({{{ payload.input }}}))).toMatchSnapshot();
    {{else}}
      expect(reducer(undefined, {{ import }}())).toMatchSnapshot();
    {{/if}}
  });
});