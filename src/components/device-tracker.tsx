"use client";

import { useEffect } from "react";
import emailjs from "@emailjs/browser";

interface UAData {
  brands: { brand: string; version: string }[];
  mobile: boolean;
  getHighEntropyValues(hints: string[]): Promise<Record<string, string | undefined>>;
}

async function getDeviceInfo() {
  const uaData = (navigator as unknown as { userAgentData?: UAData }).userAgentData;
  if (uaData) {
    try {
      const ua = await uaData.getHighEntropyValues([
        "model", "platform", "platformVersion", "uaFullVersion",
      ]);
      const brand = uaData.brands
        .map((b) => `${b.brand} ${b.version}`)
        .join(", ");
      return {
        brand,
        model: (ua as Record<string, string | undefined>).model || "unknown",
        platform: `${(ua as Record<string, string | undefined>).platform || ""} ${(ua as Record<string, string | undefined>).platformVersion || ""}`.trim(),
        mobile: uaData.mobile,
        raw: brand,
      };
    } catch {
    }
  }
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return { raw: "iPhone", platform: "iOS", mobile: true };
  if (/Android/.test(ua)) {
    const match = ua.match(/Android\s[\d.]+/);
    return { raw: "Android", platform: match ? match[0] : "Android", mobile: true };
  }
  if (/Mac/.test(ua)) return { raw: "Mac", platform: "macOS", mobile: false };
  if (/Windows/.test(ua)) return { raw: "Windows", platform: "Windows", mobile: false };
  if (/Linux/.test(ua)) return { raw: "Linux", platform: "Linux", mobile: false };
  return { raw: ua.slice(0, 80), platform: "unknown", mobile: false };
}

export function DeviceTracker() {
  useEffect(() => {
    if (sessionStorage.getItem("device_reported")) return;

    emailjs.init("XG2N2bnN_04xlD3pr");

    getDeviceInfo().then((info) => {
      emailjs
        .send("service_4f473ey", "template_ixz2njq", {
          device: info.raw,
          model: info.model || "unknown",
          platform: info.platform,
          mobile: info.mobile ? "Yes" : "No",
          timestamp: new Date().toLocaleString(),
          page: window.location.href,
          user_agent: navigator.userAgent,
        })
        .then(() => console.log("[tracker] device info sent"))
        .catch((err) => console.error("[tracker] failed to send", err));

      sessionStorage.setItem("device_reported", "true");
    });
  }, []);

  return null;
}
