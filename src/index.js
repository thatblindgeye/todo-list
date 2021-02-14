"use strict";

import './style.css';
import { accessibilityOptions, displayOptions } from "./site-settings";
import { groupModal, warningModal } from "./modals";
import { groups, modalEvents, tasks, toDo } from "./logic";
import { changeState } from "./firebase-logic";
