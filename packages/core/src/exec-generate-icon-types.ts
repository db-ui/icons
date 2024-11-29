import { generateIconTypes } from "shared/src/generate-icon-types";
import { dist, fontName } from "./data";

generateIconTypes({
  fontJsonPath: `${dist}/fonts/default/${fontName}.json`,
  outDir: dist,
});
