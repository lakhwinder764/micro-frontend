import React from 'react';
import { getRemoteModule } from './federation/loadRemote';

type Props = { container: string; module: string; fallback?: React.ReactNode };
export default function RemoteComponent({ container, module, fallback }: Props) {
  const Comp = React.useMemo(
    () => React.lazy(() => getRemoteModule<any>(container, module)),
    [container, module]
  );
  return (
    <React.Suspense fallback={fallback ?? <div>Loading…</div>}>
      <Comp />
    </React.Suspense>
  );
}
