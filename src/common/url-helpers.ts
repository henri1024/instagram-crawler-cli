async function isHtmlPage(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('text/html')) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error fetching URL:', error);
    return false;
  }
}

function isValidIgPost(url: string): boolean {
  const regex = /^https:\/\/instagram\.com\/p\/[a-zA-Z0-9_-]+$/;
  if (regex.test(url)) {
    return true;
  }
  return false;
}

function cleanIgUrl(url: string, newPath?: string): string {
  try {
    // Create a URL object
    const urlObj = new URL(url);

    // Remove query parameters
    urlObj.search = '';

    // Optionally join the new path
    if (newPath) {
      // Ensure that the path does not start with a slash if it already has a path
      const existingPath = urlObj.pathname.endsWith('/') ? urlObj.pathname.slice(0, -1) : urlObj.pathname;
      urlObj.pathname = `${existingPath}/${newPath.replace(/^\//, '')}`;
    }

    // Return the cleaned URL
    return urlObj.toString();
  } catch (error) {
    console.error("Invalid URL provided:", error);
    return "";
  }
}

export { isHtmlPage, isValidIgPost, cleanIgUrl };
