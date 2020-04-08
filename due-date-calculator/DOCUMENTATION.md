## Functions

<dl>
<dt><a href="#isWeekday">isWeekday(day)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if the given day is a weekday.</p>
</dd>
<dt><a href="#isBetweenWorkingHours">isBetweenWorkingHours(hours, minutes, seconds, millis)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if a particular time given in hours:minutes:seconds:millis is between
the start and end of business hours.</p>
</dd>
<dt><a href="#validateSubmitDate">validateSubmitDate(submitDate)</a></dt>
<dd><p>Validates that the submission date is a Date object, and that the date is on a weekday
and between working hours.</p>
</dd>
<dt><a href="#validateTurnAroundTime">validateTurnAroundTime(turnAroundTime)</a></dt>
<dd><p>Validates that the turn around time is a number and is greater than or equal to 0.</p>
</dd>
<dt><a href="#findDueDate">findDueDate(day, workingHoursLeft, hoursRemaining)</a> ⇒ <code>Date</code></dt>
<dd><p>Recursively calculates the due date by subtracting the amount of hours left
on the task, and seeing if it fits into that days business hours. If the task
will take longer than a working day, it recurses to the next day (skipping weekends).</p>
</dd>
<dt><a href="#calculateDueDate">calculateDueDate(submitDate, turnAroundTime)</a> ⇒ <code>Date</code></dt>
<dd><p>Calculates the due date given the submission date and expected turn around time.</p>
</dd>
</dl>

<a name="isWeekday"></a>

## isWeekday(day) ⇒ <code>boolean</code>
Returns true if the given day is a weekday.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if day is a weekday, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| day | <code>number</code> | The day in numerical form i.e. 0 = Sunday, 6 = Saturday |

<a name="isBetweenWorkingHours"></a>

## isBetweenWorkingHours(hours, minutes, seconds, millis) ⇒ <code>boolean</code>
Returns true if a particular time given in hours:minutes:seconds:millis is between
the start and end of business hours.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if time is between working hours, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| hours | <code>number</code> | The amount of hours. |
| minutes | <code>number</code> | The amount of minutes. |
| seconds | <code>number</code> | The amount of seconds. |
| millis | <code>number</code> | The amount of milliseconds. |

<a name="validateSubmitDate"></a>

## validateSubmitDate(submitDate)
Validates that the submission date is a Date object, and that the date is on a weekday
and between working hours.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| submitDate | <code>Date</code> | The date of submission. |

<a name="validateTurnAroundTime"></a>

## validateTurnAroundTime(turnAroundTime)
Validates that the turn around time is a number and is greater than or equal to 0.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| turnAroundTime | <code>number</code> | The turn around time in hours. |

<a name="findDueDate"></a>

## findDueDate(day, workingHoursLeft, hoursRemaining) ⇒ <code>Date</code>
Recursively calculates the due date by subtracting the amount of hours left
on the task, and seeing if it fits into that days business hours. If the task
will take longer than a working day, it recurses to the next day (skipping weekends).

**Kind**: global function  
**Returns**: <code>Date</code> - The due date of the task.  

| Param | Type | Description |
| --- | --- | --- |
| day | <code>Date</code> | The day to try fit the task into. |
| workingHoursLeft | <code>number</code> | The number of working hours left in that day. |
| hoursRemaining | <code>number</code> | The number of hours left to complete the task. |

<a name="calculateDueDate"></a>

## calculateDueDate(submitDate, turnAroundTime) ⇒ <code>Date</code>
Calculates the due date given the submission date and expected turn around time.

**Kind**: global function  
**Returns**: <code>Date</code> - Due date of the task.  

| Param | Type | Description |
| --- | --- | --- |
| submitDate | <code>Date</code> | The date of submission. |
| turnAroundTime | <code>number</code> | The turn around time in hours. |

