"use strict";

import './style.css';
import {displayOptions, accessibilityOptions} from "./site-settings";
import {generalModal, groupModal, taskModal, warningModal} from "./modals";
import {visibility, activeGroup} from "./menu";
import {task} from "./logic";
import format from 'date-fns/format';

console.log(task.list);