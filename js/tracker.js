import { getDeviceInfo } from './utils.js';

(async () => {
  if (sessionStorage.getItem('device_reported')) return;

  const info = await getDeviceInfo();

  emailjs.init('XG2N2bnN_04xlD3pr');
  emailjs.send('service_4f473ey', 'template_ixz2njq', {
    device: info.raw,
    model: info.model || 'unknown',
    platform: info.platform,
    mobile: info.mobile ? 'Yes' : 'No',
    timestamp: new Date().toLocaleString(),
    page: window.location.href,
    user_agent: navigator.userAgent,
  }).then(() => {
    console.log('[tracker] device info sent');
  }).catch(err => {
    console.error('[tracker] failed to send', err);
  });

  sessionStorage.setItem('device_reported', 'true');
})();
