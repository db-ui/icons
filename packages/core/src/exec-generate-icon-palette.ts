import { generateIconPalette } from "shared/src/generate-icon-palette";
import { dist } from "./data";

const path = "assets";

generateIconPalette({
  paths: [path],
  outDir: `${dist}/${path}`,
  skipDirsForName: 1,
  defaultVariant: "outlined",
  sizeMapping: { "32": ["28"], "20": ["16", "14", "12"] },
});
