export function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

export function nextFrame() {
  return new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
}

export async function waitForPaint() {
  await nextFrame();
  await nextFrame();
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | void> {
  return Promise.race([promise, sleep(ms)]);
}

export function isVisibleElement(element: Element) {
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight * 1.4 && rect.bottom > -120;
}

export function getCriticalRouteMedia() {
  const main = document.querySelector("main");
  const firstSection = main?.querySelector("section");
  const media = new Set<Element>();

  document.querySelectorAll("[data-route-critical]").forEach((element) => media.add(element));
  firstSection?.querySelectorAll("img, video, iframe").forEach((element) => media.add(element));

  return Array.from(media).filter(isVisibleElement);
}

export function waitForImage(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return image.decode ? image.decode().catch(() => undefined) : Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const done = () => {
      image.removeEventListener("load", done);
      image.removeEventListener("error", done);
      resolve();
    };

    image.addEventListener("load", done, { once: true });
    image.addEventListener("error", done, { once: true });
  });
}

export function waitForVideo(video: HTMLVideoElement) {
  if (video.readyState >= 2) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const done = () => {
      video.removeEventListener("loadeddata", done);
      video.removeEventListener("canplay", done);
      video.removeEventListener("playing", done);
      video.removeEventListener("error", done);
      resolve();
    };

    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("canplay", done, { once: true });
    video.addEventListener("playing", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });
}

export function waitForIframe(frame: HTMLIFrameElement) {
  return new Promise<void>((resolve) => {
    const done = () => {
      frame.removeEventListener("load", done);
      frame.removeEventListener("error", done);
      resolve();
    };

    frame.addEventListener("load", done, { once: true });
    frame.addEventListener("error", done, { once: true });
    window.setTimeout(done, 900);
  });
}
