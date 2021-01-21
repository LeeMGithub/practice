export function dpr(fontSize) {
    if (window.screen.width > 1920) {
      return ((fontSize / 1920) * window.screen.width) / window.devicePixelRatio;
    }
    return fontSize;
  }