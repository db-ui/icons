/*
 * This script can be used to update the icon type for all components using icons.
 */

import { writeFileSync, readFileSync } from "node:fs";

export type GenerateIconTypesProps = {
  fontJsonPath: string;
  outDir: string;
};

export const generateIconTypes = ({
  fontJsonPath,
  outDir,
}: GenerateIconTypesProps) => {
  try {
    const allIcons: Record<string, string[]> = JSON.parse(
      readFileSync(fontJsonPath, "utf8")
    );

    const icons = Object.keys(allIcons);

    const generatedDisclaimer = "/* This file was generated */\n";
    const iconTypes = `${generatedDisclaimer}export type IconTypes = string |\n ${icons
      .map((icon) => `"${icon}"`)
      .join("|\n")};`;
    const allIconsFile = `${generatedDisclaimer}export const ALL_ICONS: string[] = ${JSON.stringify(
      icons
    )};`;

    const filesToWrite = [
      {
        name: "icon-types",
        content: iconTypes,
      },
      {
        name: "all-icons",
        content: allIconsFile,
      },
    ];

    for (const { name, content } of filesToWrite) {
      writeFileSync(`${outDir}/${name}.ts`, content);
    }

    writeFileSync(
      `${outDir}/index.ts`,
      filesToWrite.map(({ name }) => `export * from "./${name}";`).join("\n")
    );
  } catch (e) {
    console.error(e);
  }
};
