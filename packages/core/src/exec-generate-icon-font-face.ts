import { dist, fontName } from "./data";
import generateIconFontFace from "@db-ux/icons-shared/src/generate-icon-font-face";

generateIconFontFace({
  fontName,
  outDir: dist,
  variants: ["filled"],
  sizes: ["16", "20", "24", "32", "48", "64"],
});
