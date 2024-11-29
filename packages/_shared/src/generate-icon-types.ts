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
    writeFileSync(`${outDir}/icon-types.ts`, iconTypes);
    writeFileSync(`${outDir}/all-icons.ts`, allIconsFile);
  } catch (e) {
    console.error(e);
  }
};
