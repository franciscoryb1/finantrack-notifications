import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

type Props = {
  preview: string;
  children: React.ReactNode;
};

export function EmailLayout({ preview, children }: Props) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>

          {/* Header */}
          <Section style={styles.header}>
            <div style={styles.logoBox}>
              <span style={styles.logoLetter}>F</span>
            </div>
            <Text style={styles.brandName}>Finantrack</Text>
          </Section>

          {/* Contenido */}
          <Section style={styles.content}>
            {children}
          </Section>

          {/* Footer */}
          <Hr style={styles.hr} />
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} Finantrack. Todos los derechos reservados.
            </Text>
            <Text style={styles.footerText}>
              Si no esperabas este email, podés ignorarlo de forma segura.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: '#f4f4f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: '32px 0',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e4e4e7',
    maxWidth: '520px',
    margin: '0 auto',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#0f172a',
    padding: '24px 32px',
    display: 'flex',
    alignItems: 'center',
  },
  logoBox: {
    backgroundColor: '#3b82f6',
    borderRadius: '8px',
    width: '36px',
    height: '36px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
    verticalAlign: 'middle',
  },
  logoLetter: {
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '900',
    lineHeight: '1',
  },
  brandName: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '700',
    margin: '0',
    display: 'inline',
    verticalAlign: 'middle',
    marginLeft: '12px',
  },
  content: {
    padding: '32px',
  },
  hr: {
    borderColor: '#e4e4e7',
    margin: '0 32px',
  },
  footer: {
    padding: '20px 32px',
  },
  footerText: {
    color: '#a1a1aa',
    fontSize: '12px',
    lineHeight: '1.6',
    margin: '0 0 4px 0',
  },
};
