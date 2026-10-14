import React from 'react';

/**
 * Splits text into animated masked words or characters.
 * Wrapped in an overflow-hidden mask for clean clip-path / translateY reveals.
 */
export const splitWords = (text) => {
  if (!text) return [];
  const words = text.split(' ');
  return words.map((word, wordIdx) => ({
    key: `word-${wordIdx}`,
    word,
    chars: word.split('').map((char, charIdx) => ({
      key: `char-${wordIdx}-${charIdx}`,
      char,
    })),
  }));
};

/**
 * Helper to split text elements directly in DOM
 */
export const splitElementToMaskedSpans = (element, type = 'words') => {
  if (!element) return [];
  const rawText = element.textContent || '';
  element.innerHTML = '';

  if (type === 'chars') {
    const chars = rawText.split('');
    const spans = chars.map((ch) => {
      const maskSpan = document.createElement('span');
      maskSpan.className = 'inline-block overflow-hidden align-top';
      const innerSpan = document.createElement('span');
      innerSpan.className = 'inline-block split-item';
      innerSpan.textContent = ch === ' ' ? '\u00A0' : ch;
      maskSpan.appendChild(innerSpan);
      element.appendChild(maskSpan);
      return innerSpan;
    });
    return spans;
  }

  // Default: words
  const words = rawText.split(' ');
  const spans = [];
  words.forEach((w, idx) => {
    const maskSpan = document.createElement('span');
    maskSpan.className = 'inline-block overflow-hidden align-top mr-[0.28em] last:mr-0';
    const innerSpan = document.createElement('span');
    innerSpan.className = 'inline-block split-item';
    innerSpan.textContent = w;
    maskSpan.appendChild(innerSpan);
    element.appendChild(maskSpan);
    spans.push(innerSpan);
  });
  return spans;
};

export default { splitWords, splitElementToMaskedSpans };
