/**
 * Simple script to fetch descriptions from figma
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import slugify from "slugify";
import { GetFileComponentSetsResponse } from "@figma/rest-api-spec";

const FIGMA_API_URL = "https://api.figma.com/v1";
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_ID ?? "your-figma-file-key";
const FIGMA_ACCESS_TOKEN =
  process.env.FIGMA_ACCESS_TOKEN ?? "your-figma-access-token";
const OUTPUT_DIR = "./descriptions";

async function fetchFigmaFile(
  fileKey: string
): Promise<GetFileComponentSetsResponse> {
  const response = await fetch(
    `${FIGMA_API_URL}/files/${fileKey}/component_sets`,
    {
      headers: {
        "X-Figma-Token": FIGMA_ACCESS_TOKEN,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Figma file: ${response.statusText}`);
  }

  return response.json();
}

const getLanguage = (languageString: string) => {
  const split = languageString.split("\n");
  split.shift();
  return split.reduce((previousValue, currentValue) => {
    const splitValue = currentValue.split(":");
    return {
      ...previousValue,
      [slugify(splitValue[0]).toLowerCase()]: splitValue[1]
        .split(",")
        .map((val) => val.trim())
        .filter((val) => val !== "-"),
    };
  }, {});
};

function extractComponentDescriptions(
  figmaData: GetFileComponentSetsResponse
): Record<string, any> {
  const components: Record<string, any> = {};

  figmaData.meta.component_sets.forEach((componentSet) => {
    const description: any = {};

    if (componentSet.description) {
      const splitForEn = componentSet.description.split("\n---\n");
      if (splitForEn.length > 1) {
        description.en = getLanguage(splitForEn[0]);

        const splitForDe = splitForEn[1].split("\n\n\n");
        if (splitForDe.length > 1) {
          const de = getLanguage(splitForDe[0]);
          const tags = splitForDe[1]
            .split(" ")
            .map((tag) => tag.replace("#", "").trim());
          description.de = de;
          description.tags = tags;
        }
      }
    }

    components[slugify(componentSet.name).toLowerCase()] = description || {};
  });

  return components;
}

async function saveDescriptionsToFile(
  descriptions: Record<string, string>,
  outputDir: string
) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, "descriptions.json");
  fs.writeFileSync(filePath, JSON.stringify(descriptions, null, 2));
  console.log(`Descriptions saved to ${filePath}`);
}

async function main() {
  try {
    const figmaData = await fetchFigmaFile(FIGMA_FILE_KEY);
    const descriptions = extractComponentDescriptions(figmaData);
    await saveDescriptionsToFile(descriptions, OUTPUT_DIR);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
