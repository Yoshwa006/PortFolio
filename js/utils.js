export function typewriteTextInElement(text, element, callback = () => {}, startIndex = 0, duration = 500) {
  let characterWritten = startIndex;
  const interval = setInterval(() => {
    element.textContent = text.substring(0, characterWritten++);

    if (characterWritten == text.length + 1) {
      clearInterval(interval);
      callback();
    }
  }, duration / text.length);
}

export async function getDeviceInfo() {
  if (navigator.userAgentData) {
    const ua = await navigator.userAgentData.getHighEntropyValues(['model', 'platform', 'platformVersion', 'uaFullVersion']);
    const brand = navigator.userAgentData.brands.map(b => `${b.brand} ${b.version}`).join(', ');
    return {
      brand,
      model: ua.model || 'unknown',
      platform: `${ua.platform} ${ua.platformVersion || ''}`.trim(),
      mobile: navigator.userAgentData.mobile,
      raw: brand
    };
  }
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return { raw: 'iPhone', platform: 'iOS', mobile: true };
  if (/Android/.test(ua)) {
    const match = ua.match(/Android\s[\d.]+/);
    return { raw: 'Android', platform: match ? match[0] : 'Android', mobile: true };
  }
  if (/Mac/.test(ua)) return { raw: 'Mac', platform: 'macOS', mobile: false };
  if (/Windows/.test(ua)) return { raw: 'Windows', platform: 'Windows', mobile: false };
  if (/Linux/.test(ua)) return { raw: 'Linux', platform: 'Linux', mobile: false };
  return { raw: ua.slice(0, 80), platform: 'unknown', mobile: false };
}