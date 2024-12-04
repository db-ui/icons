# @db-ux/pv-icons

This icon package contains all functional PV (Personenverkehr) icons that are provided in the DB.

## Install

```shell
npm i @db-ux/pv-icons
```

## Usage plain svg

- You can copy assets from `node_modules/@db-ux/pv-icons/dist/assets`

## Usage with `@db-ui/components`

### Import

There are different ways to include the icons via a font-face. Therefore, you need to import the correct `.css` file. There are multiple files depending on the bundler you use:

- `relative.css`: No bundler
- `absolute.css`: No bundler
- `rollup.css`: `vite`, `rollup`
- `webpack.css`: `webpack`

#### JS/TS

```javascript
// main.[js|ts]
import "@db-ux/pv-icons/dist/css/rollup.css";
```

#### CSS

```css
/* main.css */
@import "@db-ux/pv-icons/dist/css/rollup.css";
```

### Use Font-Family

If you want to use the font family you can do it like this:

#### HTML

```html
<button class="db-button" data-icon="air_condition" data-icon-variant="db-pv">
  Test
</button>
```

#### Angular

```html
<db-button icon="air_condition" data-icon-variant="db-pv">Test</db-button>
```

#### React & Vue

```tsx
<DBButton icon="air_condition" data-icon-variant="db-pv">Test</DBButton>
```

You can add additional TypeScript support by including generated types to `tsconfig.json`:

```json
React:
{
  "compilerOptions": ...,
  "include": [..., "node_modules/@db-ux/pv-icons/dist/types/react.d.ts"],
}

Vue:
{
  "compilerOptions": ...,
  "include": [..., "node_modules/@db-ux/pv-icons/dist/types/vue.d.ts"],
}
```

## Deutsche Bahn brand

As we'd like to perfectly support our users and customers on their digital journey, the usage of Deutsche Bahn brand and trademarks are bound of clear guidelines and restrictions even when being used with the code that we're provide with this product; Deutsche Bahn fully reserves all rights regarding the Deutsche Bahn brand, even though that we're providing the code of DB UI products free to use and release it under the Apache 2.0 license.
Please have a look at our brand portal at <https://marketingportal.extranet.deutschebahn.com/> for any further questions and whom to contact on any brand issues.

You must remove or replace any Deutsche Bahn brand and design assets as well as protected characteristics and trademarks. We're even also planning to provide a neutral theme that would make it much easier for you to use our product without the trademarks by Deutsche Bahn.

## Contributions

Contributions are very welcome, please refer to the [contribution guide](https://github.com/db-ui/icons/blob/main/CONTRIBUTING.md).

## Code of conduct

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone – have a look at our [Contributor Covenant Code of Conduct](https://github.com/db-ui/icons/blob/main/CODE-OF-CONDUCT.md).

## License

This project is licensed under [Apache-2.0](LICENSE).
