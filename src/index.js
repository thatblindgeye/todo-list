"use strict";

import './style.css';
import {displayOptions, accessibilityOptions} from "./site-settings";
import {warningModal, projectModal, taskModal} from "./modals";
import {visibility, groupButtons} from "./menu";
import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import differenceInDays from 'date-fns/differenceInDays';
import isToday from 'date-fns/isToday';

let now = new Date();

let dueDate = new Date(("2021-02-24").split("-").join(", "));

if (isToday(dueDate)) {
  console.log("Today")
} else if (differenceInDays(dueDate, now) <= 7) {
  console.log("this week");
} else if (differenceInDays(dueDate, now) > 7) {
  console.log(formatDistanceToNowStrict(dueDate));
} else if (dueDate === "") {
  console.log("No due date")
}
