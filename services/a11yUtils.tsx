import React, { useEffect, useRef, useCallback } from 'react';

// ============ SKIP LINK COMPONENT ============
export const SkipLink: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-red focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
  >
    Skip to main content
  </a>
);

// ============ SCREEN READER ONLY TEXT ============
export const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

// ============ LIVE REGION FOR ANNOUNCEMENTS ============
export const LiveRegion: React.FC<{
  message: string;
  assertive?: boolean;
}> = ({ message, assertive = false }) => (
  <div
    role="status"
    aria-live={assertive ? 'assertive' : 'polite'}
    aria-atomic="true"
    className="sr-only"
  >
    {message}
  </div>
);

// ============ FOCUS TRAP HOOK ============
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
      
      if (e.key === 'Escape') {
        // Dispatch custom event for parent to handle
        container.dispatchEvent(new CustomEvent('escape-pressed'));
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return containerRef;
};

// ============ FOCUS MANAGEMENT ON ROUTE CHANGE ============
export const useFocusOnRouteChange = (page: string) => {
  const mainRef = useRef<HTMLElement>(null);
  const previousPage = useRef<string>(page);

  useEffect(() => {
    if (previousPage.current !== page) {
      // Announce page change to screen readers
      const announcement = document.getElementById('route-announcer');
      if (announcement) {
        announcement.textContent = `Navigated to ${page.replace(/-/g, ' ')} page`;
      }
      
      // Focus main content area
      if (mainRef.current) {
        mainRef.current.focus();
      }
      
      previousPage.current = page;
    }
  }, [page]);

  return mainRef;
};

// ============ REDUCED MOTION HOOK ============
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

// ============ ROUTE ANNOUNCER COMPONENT ============
export const RouteAnnouncer: React.FC = () => (
  <div
    id="route-announcer"
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className="sr-only"
  />
);

// ============ ACCESSIBLE ICON BUTTON ============
interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  className = '',
  disabled = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
  >
    <span aria-hidden="true">{icon}</span>
    <span className="sr-only">{label}</span>
  </button>
);