/**
 * Reduced Motion Hook
 * Ensures all interactive & entrance animations run reliably across all browsers,
 * Windows accessibility settings (which often disable animations system-wide), and cached preferences.
 */
export const useReducedMotion = () => {
  // Always return false so that animations never freeze across different browsers,
  // operating systems (like Windows 'Animation Effects' toggle), or battery saver modes.
  // Every user visiting the portfolio gets the full, fluid, interactive experience.
  return false;
};

export default useReducedMotion;

