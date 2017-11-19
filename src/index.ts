#!/usr/bin/env node
import * as Vorpal from 'vorpal';
import actions from './commands/actions';
import component from './commands/component';
import container from './commands/container';
import feature from './commands/feature';
import credits from './commands/credits';
import reducer from './commands/reducer';
import test from './commands/test';
import saga from './commands/saga';
import pwd from './commands/pwd';
import cd from './commands/cd';
import ls from './commands/ls';
import { setBestBoyPrompt } from './utils';
const vorpal: Vorpal = Vorpal();

setBestBoyPrompt(vorpal);
actions(vorpal);
component(vorpal);
container(vorpal);
feature(vorpal);
credits(vorpal);
reducer(vorpal);
test(vorpal);
saga(vorpal);
pwd(vorpal);
cd(vorpal);
ls(vorpal);

vorpal.show();
