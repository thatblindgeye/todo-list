!function(){"use strict";const e={accessibilityContainer:document.querySelector("#accessibility-container"),animationSwitch:document.querySelector("#animation-switch"),themeSwitch:document.querySelector("#theme-switch")},t=()=>{localStorage.setItem("theme",document.documentElement.getAttribute("theme")),localStorage.setItem("animations-enabled",e.animationSwitch.getAttribute("aria-checked"))},a=((()=>{document.querySelector(".sign-in-btn");const a=document.querySelector("#lower-nav img"),n=e=>{"light"===document.documentElement.getAttribute("theme")?o():r(),t()},o=()=>{e.themeSwitch.setAttribute("aria-checked","false"),document.documentElement.setAttribute("theme","dark"),e.themeSwitch.style.backgroundPosition="center bottom -0.8rem",a.setAttribute("src","assets/images/logos/GitHub-Mark-Light-32px.png")},r=()=>{e.themeSwitch.setAttribute("aria-checked","true"),document.documentElement.setAttribute("theme","light"),e.themeSwitch.style.backgroundPosition="center top 2px",a.setAttribute("src","assets/images/logos/GitHub-Mark-32px.png")};e.themeSwitch.addEventListener("click",n),e.themeSwitch.addEventListener("keydown",(e=>{" "===e.key&&(e.preventDefault(),n())})),window.addEventListener("load",(()=>{"light"===localStorage.getItem("theme")?r():o()}))})(),(()=>{const a=()=>{"true"===e.animationSwitch.getAttribute("aria-checked")?o():n(),t()},n=()=>{e.animationSwitch.setAttribute("aria-checked","true"),document.documentElement.style.scrollBehavior="smooth",e.accessibilityContainer.style.transition="top 0.75s ease-in-out",e.animationSwitch.textContent="Animations Enabled",e.themeSwitch.style.transition="background-position 0.3s ease-in",document.querySelector("#main-nav").style.transition="left 0.5s",Array.from(document.querySelectorAll(".label-arrow")).forEach((e=>{e.style.transition="transform 0.75s"}))},o=()=>{e.animationSwitch.setAttribute("aria-checked","false"),document.documentElement.style.scrollBehavior="auto",e.animationSwitch.setAttribute("aria-checked","false"),e.animationSwitch.textContent="Animations Disabled",Array.from(document.querySelectorAll(".animated")).forEach((e=>{e.style.transition="none"}))};return e.animationSwitch.addEventListener("click",a),e.animationSwitch.addEventListener("keydown",(e=>{" "===e.key&&(e.preventDefault(),a())})),window.addEventListener("load",(()=>{"false"===localStorage.getItem("animations-enabled")?o():n()})),{animationsEnabled:n,animationsDisabled:o}})()),n={modalBox:document.querySelector(".modal-box"),modalContainer:document.querySelector(".modal-container")},o=(()=>{const e=()=>{for(;n.modalBox.firstChild;)n.modalBox.removeChild(n.modalBox.firstChild);n.modalContainer.style.display="none",n.modalBox.dataset.indexRef="",n.modalBox.dataset.groupRef=""};return window.addEventListener("keydown",(t=>{"Escape"===t.key&&e()})),{onClose:e,onOpen:()=>{n.modalContainer.style.display="flex",document.querySelector(".modal-close-button").focus()},createCloseBtn:()=>{const e=document.createElement("button");e.setAttribute("type","button"),e.setAttribute("aria-label","Close modal"),e.classList.add("modal-close-button","close-btn","focusable"),e.addEventListener("click",o.onClose),n.modalBox.appendChild(e)}}})(),r=((()=>{const e=e=>{e.target.classList.contains("disable-button")?a.animationsDisabled():e.target.classList.contains("enable-button")&&a.animationsEnabled(),t(),o.onClose()};window.addEventListener("load",(()=>{0===localStorage.length&&(()=>{const t=document.createElement("h1");t.textContent="This site uses minimal animation effects.";const a=document.createElement("p");a.textContent="Effects include moving menus and smooth scrolling. If you suffer from a vestibular disorder or otherwise prefer no animations, you can turn them off by clicking the first button below.";const o=document.createElement("p");o.textContent="You can later change this setting in the Display & Accessibility tab at the top of the page.";const r=document.createElement("button");r.setAttribute("type","button"),r.classList.add("disable-button","focusable","primary-btn"),r.textContent="DISABLE ANIMATIONS",r.addEventListener("click",e);const i=document.createElement("button");i.setAttribute("type","button"),i.classList.add("enable-button","focusable","secondary-btn"),i.textContent="ENABLE ANIMATIONS",i.addEventListener("click",e),n.modalBox.appendChild(t),n.modalBox.appendChild(a),n.modalBox.appendChild(o),n.modalBox.appendChild(r),n.modalBox.appendChild(i),n.modalContainer.style.display="flex"})()}))})(),(()=>{const e=["Important","Next 7 Days","Later","Eventually"],t=document.querySelector(".selected-group"),a=a=>{const r=document.createElement("form"),i=document.createElement("fieldset"),s=document.createElement("legend"),l=document.createElement("div"),d=document.createElement("input"),c=document.createElement("label");c.setAttribute("for","name-input"),c.textContent="Group Name";const u=document.createElement("input");if(u.setAttribute("type","text"),u.setAttribute("required","true"),u.setAttribute("id","name-input"),u.setAttribute("autocomplete","off"),u.classList.add("focusable"),a.target.classList.contains("add-group-btn"))s.textContent="Add a Group",d.setAttribute("type","submit"),d.setAttribute("value","ADD GROUP"),d.classList.add("submit-group-btn","primary-btn","focusable","submit"),l.appendChild(d);else if(a.target.classList.contains("group-option-btn")){s.textContent="Group Options",d.setAttribute("type","submit"),d.setAttribute("value","UPDATE"),d.classList.add("update-group-btn","secondary-btn","focusable","submit");const a=document.createElement("button");a.setAttribute("type","button"),a.classList.add("delete-group-btn","delete-btn","focusable"),a.textContent="DELETE GROUP";const n=document.createElement("button");n.setAttribute("type","button"),n.classList.add("delete-completed-btn","delete-btn","focusable"),n.textContent="DELETE COMPLETED TASKS",e.indexOf(t.textContent)>=0&&(c.style.opacity="0.38",u.setAttribute("disabled","true"),u.style.opacity="0.38",d.setAttribute("disabled","true"),d.style.opacity="0.38",a.setAttribute("disabled","true"),a.style.opacity="0.38"),l.appendChild(d),l.appendChild(a),l.appendChild(n)}i.appendChild(s),i.appendChild(c),i.appendChild(u),i.appendChild(l),r.appendChild(i),o.createCloseBtn(),n.modalBox.appendChild(r)};document.querySelector(".group-option-btn").addEventListener("click",(e=>{a(e),o.onOpen()})),document.querySelector(".add-group-btn").addEventListener("click",(e=>{a(e),o.onOpen()}))})(),(()=>{const e=["Normal","Important"];return{render:(t,a)=>{const r=document.createElement("form"),i=document.createElement("fieldset"),s=document.createElement("legend"),l=document.createElement("div"),d=document.createElement("label");d.setAttribute("for","name-input"),d.textContent="Task Name (required)";const c=document.createElement("input");c.setAttribute("type","text"),c.setAttribute("id","name-input"),c.setAttribute("placeholder","Enter a task name"),c.setAttribute("required","true"),c.setAttribute("autocomplete","off"),c.className="focusable";const u=document.createElement("label");u.setAttribute("for","group-select"),u.textContent="Group";const m=document.createElement("select");m.setAttribute("id","group-select"),m.className="focusable";for(let e=0;e<a.length;e++){const t=document.createElement("option");t.setAttribute("value",a[e]),t.textContent=a[e],m.appendChild(t)}const p=document.createElement("label");p.setAttribute("for","priority-select"),p.textContent="Priority";const h=document.createElement("select");h.setAttribute("id","priority-select"),h.className="focusable";for(let t=0;t<e.length;t++){const a=document.createElement("option");a.setAttribute("value",e[t]),a.textContent=e[t],h.appendChild(a)}const b=document.createElement("label");b.setAttribute("for","date-select"),b.textContent="Due Date (optional)";const f=document.createElement("input");f.setAttribute("type","date"),f.setAttribute("id","date-select"),f.className="focusable";const y=document.createElement("label");y.setAttribute("for","notes-input"),y.textContent="Additional Notes";const g=document.createElement("textarea");if(g.setAttribute("id","notes-input"),g.setAttribute("placeholder","Enter any additional notes for the task"),g.className="focusable",t.target.textContent.includes("ADD TASK")){s.textContent="Add a Task";const e=document.createElement("input");e.setAttribute("type","submit"),e.setAttribute("value","ADD ONE"),e.setAttribute("aria-label","Add task and close modal"),e.classList.add("add-single-btn","primary-btn","submit","focusable");const t=document.createElement("input");t.setAttribute("type","submit"),t.setAttribute("value","ADD MANY"),t.setAttribute("aria-label","Add task and keep modal open"),t.classList.add("add-many-btn","secondary-btn","submit","focusable"),l.appendChild(e),l.appendChild(t)}else if("EDIT"===t.target.textContent){s.textContent="Edit Task";const e=document.createElement("input");e.setAttribute("type","submit"),e.setAttribute("value","UPDATE"),e.setAttribute("aria-label","Update task and close modal"),e.classList.add("update-task-btn","primary-btn","focusable"),m.setAttribute("disabled","true"),u.style.opacity="0.38",m.style.opacity="0.38",l.appendChild(e)}i.appendChild(s),i.appendChild(d),i.appendChild(c),i.appendChild(u),i.appendChild(document.createElement("br")),i.appendChild(m),i.appendChild(document.createElement("br")),i.appendChild(p),i.appendChild(document.createElement("br")),i.appendChild(h),i.appendChild(document.createElement("br")),i.appendChild(b),i.appendChild(document.createElement("br")),i.appendChild(f),i.appendChild(document.createElement("br")),i.appendChild(y),i.appendChild(g),i.appendChild(l),r.appendChild(i),o.createCloseBtn(),n.modalBox.appendChild(r)}}})());var i=6e4;function s(e){return e.getTime()%i}function l(e){var t=new Date(e.getTime()),a=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var n=a>0?(i+s(t))%i:s(t);return a*i+n}function d(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function c(e){d(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function u(e,t){d(2,arguments);var a=c(e),n=c(t),o=a.getTime()-n.getTime();return o<0?-1:o>0?1:o}function m(e,t){d(2,arguments);var a=c(e),n=c(t);return a.getTime()-n.getTime()}function p(e,t){d(2,arguments);var a=m(e,t)/1e3;return a>0?Math.floor(a):Math.ceil(a)}function h(e){return function(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var a in t=t||{})t.hasOwnProperty(a)&&(e[a]=t[a]);return e}({},e)}var b={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function f(e){return function(t){var a=t||{},n=a.width?String(a.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}var y={date:f({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:f({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:f({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},g={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function v(e){return function(t,a){var n,o=a||{};if("formatting"===(o.context?String(o.context):"standalone")&&e.formattingValues){var r=e.defaultFormattingWidth||e.defaultWidth,i=o.width?String(o.width):r;n=e.formattingValues[i]||e.formattingValues[r]}else{var s=e.defaultWidth,l=o.width?String(o.width):e.defaultWidth;n=e.values[l]||e.values[s]}return n[e.argumentCallback?e.argumentCallback(t):t]}}function k(e){return function(t,a){var n=String(t),o=a||{},r=o.width,i=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],s=n.match(i);if(!s)return null;var l,d=s[0],c=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth];return l="[object Array]"===Object.prototype.toString.call(c)?function(e,t){for(var a=0;a<e.length;a++)if(e[a].test(d))return a}(c):function(e,t){for(var a in e)if(e.hasOwnProperty(a)&&e[a].test(d))return a}(c),l=e.valueCallback?e.valueCallback(l):l,{value:l=o.valueCallback?o.valueCallback(l):l,rest:n.slice(d.length)}}}var E,C={code:"en-US",formatDistance:function(e,t,a){var n;return a=a||{},n="string"==typeof b[e]?b[e]:1===t?b[e].one:b[e].other.replace("{{count}}",t),a.addSuffix?a.comparison>0?"in "+n:n+" ago":n},formatLong:y,formatRelative:function(e,t,a,n){return g[e]},localize:{ordinalNumber:function(e,t){var a=Number(e),n=a%100;if(n>20||n<10)switch(n%10){case 1:return a+"st";case 2:return a+"nd";case 3:return a+"rd"}return a+"th"},era:v({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:v({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:v({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:v({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:v({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(E={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var a=String(e),n=t||{},o=a.match(E.matchPattern);if(!o)return null;var r=o[0],i=a.match(E.parsePattern);if(!i)return null;var s=E.valueCallback?E.valueCallback(i[0]):i[0];return{value:s=n.valueCallback?n.valueCallback(s):s,rest:a.slice(r.length)}}),era:k({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:k({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:k({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:k({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:k({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}},w=1440,A=43200,L=525600;function x(e,t,a){d(2,arguments);var n=a||{},o=n.locale||C;if(!o.formatDistance)throw new RangeError("locale must contain localize.formatDistance property");var r=u(e,t);if(isNaN(r))throw new RangeError("Invalid time value");var i,s,m=h(n);m.addSuffix=Boolean(n.addSuffix),m.comparison=r,r>0?(i=c(t),s=c(e)):(i=c(e),s=c(t));var b,f=null==n.roundingMethod?"round":String(n.roundingMethod);if("floor"===f)b=Math.floor;else if("ceil"===f)b=Math.ceil;else{if("round"!==f)throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");b=Math.round}var y,g=p(s,i),v=(l(s)-l(i))/1e3,k=b((g-v)/60);if("second"===(y=null==n.unit?k<1?"second":k<60?"minute":k<w?"hour":k<A?"day":k<L?"month":"year":String(n.unit)))return o.formatDistance("xSeconds",g,m);if("minute"===y)return o.formatDistance("xMinutes",k,m);if("hour"===y){var E=b(k/60);return o.formatDistance("xHours",E,m)}if("day"===y){var x=b(k/w);return o.formatDistance("xDays",x,m)}if("month"===y){var S=b(k/A);return o.formatDistance("xMonths",S,m)}if("year"===y){var D=b(k/L);return o.formatDistance("xYears",D,m)}throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'")}function S(e){d(1,arguments);var t=c(e);return t.setHours(0,0,0,0),t}var D=864e5;function q(e,t){d(2,arguments);var a=S(e),n=S(t),o=a.getTime()-l(a),r=n.getTime()-l(n);return Math.round((o-r)/D)}const N=(()=>{const e=document.querySelector(".custom-groups-container");return{render:t=>{(()=>{for(;e.firstChild;)e.removeChild(e.firstChild)})(),Object.keys(t).forEach((t=>{const a=document.createElement("button");a.setAttribute("type","button"),a.setAttribute("aria-label",`Group name: ${t}`),a.classList.add("custom-group","focusable","group-btn"),a.textContent=t,e.appendChild(a)}))}}})(),M=(()=>{const e=document.querySelector(".selected-group"),t=document.querySelector(".task-container"),a=e=>{const t=new Date;return q(new Date(e.split("-").join(", ")),t)},n=(e,a,n)=>{const o=document.createElement("section");o.setAttribute("data-group",a),o.setAttribute("data-index",n),o.className="task-item";const r=document.createElement("span");if(r.setAttribute("aria-label",`${e.priority} task`),r.className="task-priority","Important"===e.priority){const e=document.createElement("span");e.className="material-icons",e.textContent="priority_high",r.appendChild(e)}const i=document.createElement("span");i.setAttribute("role","checkbox"),i.setAttribute("aria-checked","false"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label",e.taskName),i.classList.add("task-status","focusable"),e.completed&&(i.style.backgroundImage="url(assets/images/icons/done-black-24dp.svg)");const s=document.createElement("span");s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`Details for ${e.taskName}`),s.classList.add("task-name","focusable"),s.textContent=e.taskName;const l=document.createElement("span");l.setAttribute("aria-label",`Due date for task ${e.taskName}: ${e.dueDate}`),l.className="task-date",l.textContent=(e=>{const t=new Date,a=new Date(e.split("-").join(", "));switch(!0){case""===e:return"No due date";case q(a,t)<0:return"Due date passed";case 0===q(a,t):return"Today";case 1===q(a,t):return"Tomorrow";case q(a,t)<=29:return q(a,t)+" days";default:return function(e,t){return d(1,arguments),x(e,Date.now(),t)}(a)}})(e.dueDate);const c=document.createElement("div");c.setAttribute("data-task",e.taskName),c.setAttribute("data-group",a),c.setAttribute("data-index",n),c.className="task-details";const u=document.createElement("p"),m=e.notes.split("\n");u.className="task-notes";for(let e=0;e<m.length;e++){const t=document.createTextNode(m[e]);u.appendChild(t),u.appendChild(document.createElement("br"))}const p=document.createElement("button");p.setAttribute("type","button"),p.setAttribute("aria-label",`Edit task ${e.taskName}`),p.classList.add("edit-btn","focusable"),p.textContent="EDIT";const h=document.createElement("button");h.setAttribute("type","button"),h.setAttribute("aria-label",`Delete task ${e.taskName}`),h.classList.add("delete-btn","focusable"),h.textContent="DELETE",c.appendChild(u),c.appendChild(p),c.appendChild(h),o.appendChild(r),o.appendChild(i),o.appendChild(s),o.appendChild(l),o.appendChild(c),t.appendChild(o)};return{loadGroupTasks:(e,o)=>{const r=Object.keys(e);switch((()=>{for(;t.firstChild;)t.removeChild(t.firstChild)})(),o){case document.getElementById("important"):Object.values(e).forEach(((e,t)=>{for(let a=0;a<e.length;a++)"Important"===e[a].priority&&n(e[a],r[t],a)}));break;case document.getElementById("next-7-days"):Object.values(e).forEach(((e,t)=>{for(let o=0;o<e.length;o++)a(e[o].dueDate)<=7&&n(e[o],r[t],o)}));break;case document.getElementById("later"):Object.values(e).forEach(((e,t)=>{for(let o=0;o<e.length;o++)a(e[o].dueDate)>7&&n(e[o],r[t],o)}));break;case document.getElementById("eventually"):Object.values(e).forEach(((e,t)=>{for(let a=0;a<e.length;a++)""===e[a].dueDate&&n(e[a],r[t],a)}));break;default:e[o.textContent].forEach(((e,t)=>{n(e,o.textContent,t)}))}if(0===t.children.length){const e=document.createElement("h2");e.textContent="No tasks for this group!",t.appendChild(e)}},updateHeader:t=>{e.textContent=t.textContent}}})(),T={activeOnLoad:document.getElementById("important"),defaultGroups:["Important","Next 7 Days","Later","Eventually"],modalBox:document.querySelector(".modal-box"),taskHeader:document.querySelector(".selected-group")},O=(()=>{const e=JSON.parse(localStorage.getItem("toDo-list"))||{Example:[{taskName:"Do the dishes",completed:!1,priority:"Normal",dueDate:"",notes:"Let the pans soak, put the plates in the dishwasher, wash the mugs by hand.\n\nWash the pans after 30 minutes of soaking."},{taskName:"Bring Muffin to vet",completed:!1,priority:"Important",dueDate:"2021-12-31",notes:"Pack her favorite toy so she stays calm."}]};return window.addEventListener("load",(t=>{N.render(e),M.loadGroupTasks(e,T.activeOnLoad)})),{masterList:e,saveToLocal:()=>{localStorage.setItem("toDo-list",JSON.stringify(list))}}})(),P=(()=>{const e=e=>{e.classList.add("active")};return document.getElementById("main-nav").addEventListener("click",(t=>{t.target.classList.contains("group-btn")&&(Array.from(document.getElementsByClassName("group-btn")).forEach((e=>{e.classList.remove("active")})),e(t.target),M.updateHeader(t.target),M.loadGroupTasks(O.masterList,t.target))})),{create:e=>{O.masterList[e]=[],console.log(O.masterList)},update:(e,t)=>{delete Object.assign(O.masterList,{[t]:O.masterList[e]})[e],console.log(O.masterList)},checkName:e=>T.defaultGroups.indexOf(e)>=0||Object.keys(O.masterList).indexOf(e)>=0||e.match(/^\s{1,}$/)||""===e,remove:e=>{delete O.masterList[e],console.log(O.masterList)},setActive:e}})(),B=(()=>{const e=document.querySelector(".task-container"),t=e=>{switch(!0){case e.target.classList.contains("task-status"):(e=>{const t=e.dataset.group,a=e.dataset.index;null===e.children[1].getAttribute("style")?(O.masterList[t][a].completed=!0,e.children[1].style.backgroundImage="url(assets/images/icons/done-black-24dp.svg)"):(O.masterList[t][a].completed=!1,e.children[1].removeAttribute("style")),console.log(O.masterList)})(e.target.parentElement);break;case e.target.classList.contains("task-name"):e.target.parentElement.children[4].classList.toggle("expanded");break;case e.target.classList.contains("edit-btn"):r.render(e,Object.keys(O.masterList)),(e=>{const t=e.dataset.group,a=e.dataset.index;T.modalBox.dataset.indexRef=a,T.modalBox.dataset.groupRef=t,document.querySelector("#name-input").value=O.masterList[t][a].taskName,document.querySelector("#group-select").value=t,document.querySelector("#priority-select").value=O.masterList[t][a].priority,document.querySelector("#date-select").value=O.masterList[t][a].dueDate,document.querySelector("#notes-input").value=O.masterList[t][a].notes})(e.target.parentElement),o.onOpen();break;case e.target.classList.contains("delete-btn"):confirm(`Please click "OK" to confirm deletion of task \n            "${e.target.parentElement.dataset.task}".`)&&(a(e.target.parentElement),M.loadGroupTasks(O.masterList,document.querySelector(".active")));break;default:return}},a=e=>{O.masterList[e.dataset.group].splice(e.dataset.index,1),e.remove(),console.log(O.masterList)};return document.querySelector(".add-task-btn").addEventListener("click",(e=>{0!==Object.keys(O.masterList).length?(r.render(e,Object.keys(O.masterList)),o.onOpen()):alert("No groups exist. Please create a group before adding a task.")})),e.addEventListener("click",t),e.addEventListener("keydown",(e=>{" "===e.key&&(e.target.classList.contains("task-status")||e.target.classList.contains("task-name"))&&(e.preventDefault(),t(e))})),{create:(e,t,a,n,o)=>({taskName:e,priority:t,dueDate:a,notes:n,completed:o}),update:()=>{const e=T.modalBox.getAttribute("data-group-ref"),t=T.modalBox.getAttribute("data-index-ref");O.masterList[e][t].taskName=document.querySelector("#name-input").value,O.masterList[e][t].priority=document.querySelector("#priority-select").value,O.masterList[e][t].dueDate=document.querySelector("#date-select").value,O.masterList[e][t].notes=document.querySelector("#notes-input").value},checkName:e=>e.match(/^\s{1,}$/)||""===e,removeSingle:a,removeCompleted:e=>{if(T.defaultGroups.indexOf(e)>=0){const e=Object.keys(O.masterList);Object.values(O.masterList).forEach(((t,a)=>{for(let n=t.length-1;n>=0;n--)!0===t[n].completed&&O.masterList[e[a]].splice(n,1)}))}else O.masterList[e].forEach((t=>{for(let a=O.masterList[e].length-1;a>=0;a--)!0===t.completed&&O.masterList[e].splice(a,1)}))},confirmMassRemove:()=>T.defaultGroups.indexOf(T.taskHeader.textContent)>=0?confirm('This will delete all completed tasks in every group. \n\nPlease click "OK" to confirm deletion.'):confirm(`This will delete all completed tasks in the ${T.taskHeader.textContent} group.\n\nPlease click "OK" to confirm deletion.`)}})();T.modalBox.addEventListener("click",(e=>{const t=document.querySelector(".active"),a=document.querySelector("#name-input"),n=document.querySelector("#group-select");switch(e.target){case document.querySelector(".submit-group-btn"):case document.querySelector(".update-group-btn"):if(e.preventDefault(),P.checkName(a.value))return void alert("Group name cannot be blank and cannot already be taken.\n\nPlease enter a new name.");e.target.classList.contains("submit-group-btn")?(P.create(a.value),N.render(O.masterList),P.setActive(T.activeOnLoad),M.loadGroupTasks(O.masterList,T.activeOnLoad),M.updateHeader(T.activeOnLoad)):(P.update(T.taskHeader.textContent,a.value),t.textContent=a.value,M.updateHeader(t)),o.onClose();break;case document.querySelector(".delete-group-btn"):confirm(`This will delete the ${T.taskHeader.textContent} group, along with any tasks within it.\n\nPlease click "OK" to confirm deletion.`)&&(P.remove(T.taskHeader.textContent),o.onClose(),N.render(O.masterList),P.setActive(T.activeOnLoad),M.loadGroupTasks(O.masterList,T.activeOnLoad),M.updateHeader(T.activeOnLoad));break;case document.querySelector(".delete-completed-btn"):B.confirmMassRemove()&&(B.removeCompleted(T.taskHeader.textContent),o.onClose(),M.loadGroupTasks(O.masterList,t),console.log(O.masterList));break;case document.querySelector(".add-single-btn"):case document.querySelector(".add-many-btn"):if(e.preventDefault(),B.checkName(a.value))return void alert("Task name cannot be blank.\n\nPlease enter a new name.");{const r=B.create(a.value,document.querySelector("#priority-select").value,document.querySelector("#date-select").value,document.querySelector("#notes-input").value,!1);O.masterList[n.value].push(r),e.target.classList.contains("add-many-btn")?(a.focus(),a.value="",n.selectedIndex=0,document.querySelector("#priority-select").selectedIndex=0,document.querySelector("#date-select").value="",document.querySelector("#notes-input").value=""):o.onClose(),M.loadGroupTasks(O.masterList,t),console.log(O.masterList)}break;case document.querySelector(".update-task-btn"):if(e.preventDefault(),B.checkName(a.value))return void alert("Task name cannot be blank.\n\nPlease enter a new name.");B.update(),o.onClose(),M.loadGroupTasks(O.masterList,T.taskHeader),console.log(O.masterList);break;default:return}})),console.log(O.masterList),(()=>{const e=document.querySelector("#main-nav"),t=document.querySelector(".menu-button"),a=document.querySelector(".menu-close-button"),n=()=>{document.documentElement.scrollWidth>763?(e.style.visibility="visible",e.style.left="0"):(e.style.visibility="hidden",e.style.left="-800px")};window.addEventListener("resize",n),window.addEventListener("load",n);const o=()=>{"hidden"===e.style.visibility?(e.style.visibility="visible",e.style.left="0",a.focus()):(e.style.left="-800px",setTimeout((()=>{e.style.visibility="hidden"}),600),t.focus())};t.addEventListener("click",o),a.addEventListener("click",o)})()}();