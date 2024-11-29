import { dist, fontName } from "./data";
import { generateIconTypes } from "@db-ux/icons-shared";

generateIconTypes({
  fontJsonPath: `${dist}/fonts/default/${fontName}.json`,
  outDir: dist,
});
