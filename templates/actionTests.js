

describe('{{ import }}', () => {
  it('should create an action with a type of {{ type }}', () => {
    expect({{ import }}().type).toBe('{{ type }}');
  });

  it('should set an Error as the payload if called with one', () => {
    const err = new Error('test');
    expect({{ import }}(err).payload instanceof Error).toBe(true);
  });

  it('should set an error attribute if called with an Error', () => {
    const err = new Error('test');
    expect({{ import }}(err).error).toBe(true);
  })

  {{#if payload}}

  it('should create an action with an appropriate payload creator', () => {
    expect({{ import }}({{{ payload.input }}}).payload){{{ payload.equalityCheck }}}({{{ payload.output }}});
  });
  {{/if}}
  {{#if meta}}

  it('should create an action with an appropriate meta creator', () => {
    expect({{ import }}({{{ payload.input }}}, {{{ meta.input }}}).meta){{{ payload.equalityCheck }}}({{{ meta.output }}});
  });
  {{/if}}
  });