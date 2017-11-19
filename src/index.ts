#!/usr/bin/env node
import * as Vorpal from 'vorpal';
import actions from './commands/actions';
import component from './commands/component';
import container from './commands/container';
import feature from './commands/feature';
import credits from './commands/credits';
import reducer from './commands/reducer';
import config from './commands/config';
import test from './commands/test';
import saga from './commands/saga';
import del from './commands/del';
import pwd from './commands/pwd';
import get from './commands/get';
import set from './commands/set';
import cd from './commands/cd';
import ls from './commands/ls';
import { bootstrap } from './utils';
const vorpal: Vorpal = Vorpal();

bootstrap(vorpal);
component(vorpal);
container(vorpal);
actions(vorpal);
feature(vorpal);
credits(vorpal);
reducer(vorpal);
config(vorpal);
test(vorpal);
saga(vorpal);
del(vorpal);
pwd(vorpal);
get(vorpal);
set(vorpal);
cd(vorpal);
ls(vorpal);

vorpal.show();
