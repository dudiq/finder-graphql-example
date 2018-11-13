# Github repo/user finder

Based on React and [Parcel Bundler].

> DON'T FORGET about safe write in ide [https://en.parceljs.org/hmr.html#safe-write](https://en.parceljs.org/hmr.html#safe-write) DOH!

### Setup

```
npm i
```

### Usage

#### Run it

Use following command and open `http://localhost:1337`. When you edit `blahblah.js` and save your changes. Parcel will automatically rebuild all files
```
npm start
```

#### Building for Production

Use following command when you want to compile your JS and copy your `index.html` to the `dist` folder you can then deploy.

```
npm run build
```

### Notes

#### Development

Please! do not use `console.` in development, use `import log from '../common/logger/'` 
and create logger for each module `const logger = log('myFileName.js')` for understand, what's wrong and where it's wrong

#### HTML

If you want to move `index.html`, make sure to update the `start` and `build` npm scripts in `package.json` with the new relative path to the file.

#### CSS

[Parcel uses PostCSS plugins to manage CSS assets](https://parceljs.org/transforms.html#postcss). You can find and modify PostCSS configuration by editing `.postcssrc` file.

#### Deployment

Keep in mind that Parcel builds the app into a `dist` directory. 
If you want to change the destination for build, add `--out-dir build` to both `start` and `build` npm tasks in `package.json`.

<!-- Links -->
[PostCSS]: http://postcss.org/
[Parcel Bundler]: https://parceljs.org
