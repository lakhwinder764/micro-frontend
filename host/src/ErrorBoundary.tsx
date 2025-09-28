import React from 'react';

export class ErrorBoundary extends React.Component<{fallback: React.ReactNode},{hasError:boolean}>{
  constructor(props:any){ super(props); this.state={hasError:false};}
  static getDerivedStateFromError(){ return { hasError: true }; }
  componentDidCatch(){ /* log if needed */ }
  render(){ return this.state.hasError ? <>{this.props.fallback}</> : this.props.children; }
}
