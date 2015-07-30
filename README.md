form-handler
============

Give this constructor a set of form field elements and it will allow you to run valiadation, read the values, enable, disable, reset, and more.

To get started
--------------

### dependencies

* jQuery
* event-handler (Optional. For the form-listener-plugin in the example.)

```js
var fields = new FormFields($(':input').toArray());
```

Customizing
-----------

Data attributes on the form fields do all the work of customizing the validation per item.

```html
// required name
<input name="name" type="text" data-validation="required">

// required and valid email
<input name="email" type="text" data-validation="required email">
```

List of validation options:

* required
* blank
* email
* checked
* unchecked

Use the regex attribute for more control.

```html
// limit to only numbers
<input name="age" type="text" data-regex="^[0-9]*$">

// must contain a weekday
<input name="weekday" type="text" data-regex="^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$" data-regex-flags="i">
```

Force an input to match another.

```html
<input name="email" type="text">
<input name="confirm-email" type="text" data-match="email">
```

Works on `select`, `type="checkbox"`, and `type="radio"`. For radio groups, apply the data attributes to the first radio element.

API
---

All variables in code examples continue from previous examples.

```js
// get any field instance by name
var email = fields.field['email'];

// get an array of fields
console.log(fields.fields.length); // 6
```

List of arrays on `fields`:

* texts
* selects
* checkboxes
* radioGroups
* fields

List of methods on `fields`:

* getValue(name, refresh)
* refresh() // "refresh" always refers to reseting the value property from the DOM element `value`.
* disable()
* enable()
* readonly()
* editable()
* validate(refresh, dirty) // returns array of invalid fields
* reset()
* read(refresh)
* changes(refresh)
* startOver(reset) // all fields are back to pristine and `value` equals `original`.

List of properties on field instance `email`:

* type
* $el
* els
* el
* form
* name
* disabled
* isReadonly
* value
* original
* isPristine
* status
* fails
* isValid

List of methods on field instance `email`:

* refresh()
* validate(dirty)
* getValue(refresh)
* setValue(value)
* disable()
* enable()
* readonly()
* editable()
