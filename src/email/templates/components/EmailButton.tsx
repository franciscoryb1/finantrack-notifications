import { Button } from '@react-email/components';
import * as React from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
};

export function EmailButton({ href, children }: Props) {
  return (
    <Button href={href} style={styles.button}>
      {children}
    </Button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '15px',
    fontWeight: '600',
    padding: '12px 28px',
    textDecoration: 'none',
    textAlign: 'center',
  },
};
