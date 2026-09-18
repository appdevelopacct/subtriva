/**
 * Helper to open the Tally Early Access popup modal.
 */
export function openEarlyAccessPopup() {
  if (typeof window !== 'undefined') {
    if ((window as any).Tally) {
      (window as any).Tally.openPopup('PdQkeb', {
        emoji: { text: '👋', animation: 'wave' },
      });
    } else {
      window.location.hash = 'tally-open=PdQkeb&tally-emoji-text=👋&tally-emoji-animation=wave';
    }
  }
}
