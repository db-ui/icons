import generateIconFonts from "@db-ui/gif/dist/generate-icon-fonts";
import { dist, fontName } from "./data";

generateIconFonts({
  fontName,
  src: dist,
  cleanIgnoreVariants: [],
  variants: ["filled", "inverted"],
  skipClean: true,
  withSizes: true,
});