// host/src/federation/loadRemote.ts
type RemoteMap = Record<string, string>;
declare global {
  interface Window {
    __remote_map__?: RemoteMap;
    [key: string]: any;
  }
}

export async function ensureRemote(container: string) {
  // fetch runtime map
  if (!window.__remote_map__) {
    const res = await fetch("/remotes.json");
    window.__remote_map__ = await res.json();
  }
  const url = window.__remote_map__![container];
  if (!url) throw new Error(`No remote URL for ${container}`);

  // already loaded?
  if ((window as any)[container]) return;

  // ✅ Vite-friendly: load as an ES module
  // This executes the remoteEntry and registers window[container]
  await import(/* @vite-ignore */ url);
}

export async function getRemoteModule<T = any>(
  container: string,
  module: string
): Promise<T> {
  await ensureRemote(container);
  const factory = await (window as any)[container].get(module);
  return factory();
}
