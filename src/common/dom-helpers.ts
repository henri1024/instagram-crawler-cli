import { DomMedia } from '../models/dom-instagram-first-load';
import { MAX_COMMENT } from './constant';

/**
 * Recursively searches for an object with a specified property in a nested object structure.
 *
 * @param {any} obj - The object to search in.
 * @param {string} targetKey - The name of the property to search for.
 * @return {DomMedia | null} - The object with the specified property, or null if not found.
 */
function findTargetObject(obj: any, targetKey: string): DomMedia | null {
  if (typeof obj !== 'object' || obj === null) {
    return null;
  }

  if (obj.hasOwnProperty(targetKey)) {
    return obj;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const result = findTargetObject(obj[key], targetKey);
      if (result !== null) {
        return result;
      }
    }
  }

  return null;
}

/**
 * Extracts the script tag with a nested field from an HTML string.
 *
 * @param {string} htmlString - The HTML string to extract the script tag from.
 * @param {string} path - The nested field to search for in the script tag.
 * @return {DomMedia | null} - The object with the specified nested field, or null if not found.
 */
function extractScriptsWithNestedField(
  htmlString: string,
  path: string
): DomMedia | null {
  // Create a temporary container element to hold the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // Find all script tags
  const scriptTags = tempDiv.querySelectorAll('script');
  var jsonData: DomMedia | null = null;

  scriptTags.forEach((scriptTag) => {
    if (scriptTag.textContent) {
      if (scriptTag.textContent.includes(path)) {
        // Attempt to parse the content of the script tag as JSON
        try {
          jsonData = findTargetObject(JSON.parse(scriptTag.textContent), path);
        } catch (error) {
          throw error;
        }
      }
    }
  });

  return jsonData;
}

function isReachMaxFetched(arr: any[]): boolean {
  return arr.length >= MAX_COMMENT;
}

export { findTargetObject, extractScriptsWithNestedField, isReachMaxFetched };
