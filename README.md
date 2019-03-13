# NJ Select
Native JS custom select.

## Demo
It's on the [GitHub Pages](https://phx-vic.github.io/nj-select/).

## Install
#### npm
```sh
npm install nj-select
```

#### yarn
```sh
yarn add nj-select
```

#### Manual download
You can manually download nj-select from [repository](https://github.com/phx-vic/nj-select/blob/master/dist/nj-select.js)

## How to use
Add select:
```sh
<select id="nj">
    ...
</select>
```

Use styles:
```sh
<link rel="stylesheet" href="dist/style.css">
```

Import via ES modules:
```sh
import NJSelect from 'nj-select';
```

Or in browser:
```sh
<script src="dist/nj-select.js"></script>
```

To initialise:
```sh
new NJSelect(document.getElementById('nj'));
```

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)
