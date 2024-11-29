import { dist, fontName } from "./data";
import { generateIconTypes } from "@db-ux/icons-shared/src/generate-icon-types";

generateIconTypes({
  fontJsonPath: `${dist}/fonts/default/${fontName}.json`,
  outDir: dist,
});
