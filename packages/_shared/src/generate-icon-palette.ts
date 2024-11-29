import { globSync } from "glob";
import { mkdirSync } from "fs";
import { copyFileSync, existsSync } from "node:fs";

export type GenerateIconPaletteProps = {
  paths: string[];
  outDir: string;
  ignoreGlobs?: string[];
  defaultVariant?: string;
  skipDirsForName?: number;
  dry?: boolean;
  sizeMapping?: Record<string, string[]>;
};

const createDir = (dir: string, dry?: boolean) => {
  if (!dry) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }
};

export const generateIconPalette = ({
  paths,
  ignoreGlobs,
  skipDirsForName,
  outDir,
  dry,
  sizeMapping,
  defaultVariant,
}: GenerateIconPaletteProps) => {
  const globPaths = globSync(
    paths.map((path) => `${path}/**/*.svg`),
    { ignore: ignoreGlobs }
  ).map((path) => path.replace(/\\/g, "/"));

  createDir(outDir, dry);

  for (const path of globPaths) {
    const splitPath = path
      .split("/")
      .filter(
        (pathElement) =>
          !paths.includes(pathElement) &&
          (!defaultVariant || pathElement !== defaultVariant)
      );

    let folderToWrite = outDir;
    if (skipDirsForName) {
      let subFolders = [];
      for (let i = 0; i < skipDirsForName; i++) {
        subFolders.push(splitPath.shift());
      }

      for (const dir of subFolders) {
        folderToWrite += `/${dir}`;
        createDir(folderToWrite, dry);
      }
    }

    if (dry) {
      console.log(`${folderToWrite}/${splitPath.join("_")}`);
    } else {
      const createdPath = `${folderToWrite}/${splitPath
        .join("_")
        .replaceAll("-", "_")}`;
      copyFileSync(path, createdPath);
      const iconSize = splitPath.at(-1);
      if (sizeMapping) {
        for (const [size, mapping] of Object.entries(sizeMapping)) {
          if (iconSize?.includes(size)) {
            for (const copySize of mapping) {
              copyFileSync(path, `${createdPath.replace(size, copySize)}`);
            }
          }
        }
      }
    }
  }
};
