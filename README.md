[![GoBoo - GET IT. BOOK IT.](http://goboo.de/logo/200-gray.png)](http://goboo.de)

JavaScript API adapter
======================

This is a [GoBoo](http://goboo.de) API adapter written in JavaScript.

Installation
------------

Download the [goboo-adapter.js](dist/goboo-adapter.js) or the minified [goboo-adapter.min.js](dist/goboo-adapter.min.js)
and put it somewhere in your project.

Then add the following to your HTML:

```html
<script src="path/to/goboo-adapter.js"></script>
<!-- use your GoBoo installation domain here
                                   /
                                  |
                                  V   -->
<script>goboo.init({'host':'demo.goboo.io'});</script>
```
