import React from 'react';
import renderer from 'react-test-renderer';
{{#each imports}}
  {{{ this }}}
{{/each}}
import Component from '../component';

{{{ wrapper }}}
