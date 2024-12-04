import * as fs from "fs";

const oldIconsPath = "all-icons-old.ts";
const newIconsPath = "all-icons.ts";

function getIconsArray(filePath: string): string[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const match = fileContent.match(
    /export const ALL_ICONS: string\[\] = \[(.*?)\];/s
  );
  if (!match) {
    throw new Error(`Could not find ALL_ICONS array in ${filePath}`);
  }
  return match[1].split(",").map((icon) => icon.trim().replace(/['"]/g, ""));
}

const oldIcons = getIconsArray(oldIconsPath);
const newIcons = getIconsArray(newIconsPath);

const oldIconsSet = new Set(oldIcons);
const newIconsSet = new Set(newIcons);

const addedIcons = newIcons.filter((icon) => oldIconsSet.has(icon));
const removedIcons = oldIcons.filter((icon) => newIconsSet.has(icon));

console.log("Added Icons:", addedIcons);
console.log("Removed Icons:", removedIcons);
