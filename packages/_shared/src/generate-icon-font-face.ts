import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { mkdirSync } from "fs";

export type GenerateIconFontFaceProps = {
  fontName: string;
  variants: string[];
  outDir: string;
  sizes?: string[];
};

const iconPaths: Record<string, string> = {
  relative: "../fonts",
  absolute: "/assets/fonts",
};

const getFontFace = (
  iconPath: string,
  fontName: string,
  variant: string,
  size?: string
): string => {
  const fontFamily = `${fontName}-${variant}`;
  let result = `
  @font-face {
    font-display: block;
    font-family: "${fontFamily}";
    font-style: normal;
    font-weight: ${size ? size : "normal"};
    src: url("${iconPath}/${variant}${
    size ? `_${size}` : ""
  }/${fontName}.woff2")
      format("woff2");
  }
  `;

  if (size) {
    result += `
      [data-icon-weight="${size}"],
    [data-icon-weight-before="${size}"] {
        --db-icon-font-weight: ${size};
    }

    [data-icon-weight-after="${size}"] {
        --db-icon-font-weight: ${size};
    }`;
  } else {
    if (variant === "default") {
      result += `  
  [data-icon-variant="${fontName}"],
  [data-icon-variant-before="${fontName}"] {
      --db-icon-font-family: "${fontFamily}";
  }

  [data-icon-variant-after="${fontName}"] {
      --db-icon-font-family: "${fontFamily}";
  }`;
    }

    result += `  
  [data-icon-variant="${fontFamily}"],
  [data-icon-variant-before="${fontFamily}"] {
      --db-icon-font-family: "${fontFamily}";
  }

  [data-icon-variant-after="${fontFamily}"] {
      --db-icon-font-family: "${fontFamily}";
  }`;
  }

  return result;
};

const generateIconFontFace = ({
  fontName,
  variants,
  sizes,
  outDir,
}: GenerateIconFontFaceProps) => {
  if (!existsSync(`${outDir}/css`)) {
    mkdirSync(`${outDir}/css`, { recursive: true });
  }

  if (!existsSync(`${outDir}/types`)) {
    mkdirSync(`${outDir}/types`, { recursive: true });
  }

  const currentPackageJson = JSON.parse(readFileSync("package.json", "utf-8"));

  const filledIconPath = {
    ...iconPaths,
    rollup: `${currentPackageJson.name}/dist/fonts`,
    webpack: `~${currentPackageJson.name}/dist/fonts`,
  };

  for (const [key, path] of Object.entries(filledIconPath)) {
    let fontFaceFile = "";
    for (const variant of ["default", ...variants]) {
      fontFaceFile += getFontFace(path, fontName, variant);
      if (sizes) {
        for (const size of sizes) {
          fontFaceFile += getFontFace(path, fontName, variant, size);
        }
      }
    }

    writeFileSync(`${outDir}/css/${key}.css`, fontFaceFile);
  }

  const stringLiterals = [
    fontName,
    ...variants.map((variant) => `${fontName}-${variant}`),
  ]
    .map((name) => `"${name}"`)
    .join(" | ");

  const types = `
    "data-icon-variant"?: ${stringLiterals};
    "data-icon-variant-before"?: ${stringLiterals};
    "data-icon-variant-after"?: ${stringLiterals};        
    `;

  writeFileSync(
    `${outDir}/types/react.d.ts`,
    `declare module React {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    ${types}
  }
}`
  );
  writeFileSync(
    `${outDir}/types/vue.d.ts`,
    `export * from "@vue/runtime-core";

declare module "@vue/runtime-core" {
  interface PublicProps {
    ${types}
  }
}`
  );
};

export default generateIconFontFace;
