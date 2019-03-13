# NJ Select
Native JS custom select.

## Demo
It's on the [GitHub Pages](https://phx-vic.github.io/nj-select/).

## Install
#### npm
```
$ npm install nj-select
```

#### yarn
```
$ yarn add nj-select
```

#### Manual download
You can manually download NJ Select from [repository](https://github.com/phx-vic/nj-select/blob/master/dist/nj-select.js).

## How to use
Add select:
``` html
<select id="nj">
    ...
</select>
```

Use styles:
``` html
<link rel="stylesheet" href="dist/style.css">
```

Import via ES modules:
``` javascript
import NJSelect from 'nj-select';
```

Or in browser:
``` html
<script src="dist/nj-select.js"></script>
```

To initialise:
``` javascript
new NJSelect(document.getElementById('nj'));
```

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)
