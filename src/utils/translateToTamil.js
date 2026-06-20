/**
 * Auto-translates text to Tamil using the free MyMemory API.
 * No API key required for up to 5000 chars/day.
 * @param {string} text - English text to translate
 * @returns {Promise<string>} - Tamil translation or original text on failure
 */
export const translateToTamil = async (text) => {
  if (!text || typeof text !== 'string') return text;
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ta`;
    const res = await fetch(url);
    const data = await res.json();
    if (data?.responseStatus === 200 && data?.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    return text;
  } catch {
    return text;
  }
};
