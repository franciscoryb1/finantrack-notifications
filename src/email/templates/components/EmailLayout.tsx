import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Img,
} from '@react-email/components';
import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';

// Colores del tema dark de Finantrack (globals.css)
const C = {
  bodyBg:      '#0f172a', // --background dark (slate-900)
  containerBg: '#1e293b', // --card dark (slate-800)
  border:      'rgba(255,255,255,0.1)', // --border dark
  primary:     '#8b5cf6', // --primary dark (violet-500 ≈ brand)
  textPrimary: '#f8fafc', // --foreground dark (slate-50)
  textBody:    '#cbd5e1', // slate-300
  textMuted:   '#94a3b8', // --muted-foreground dark (slate-400)
};

// Leído una sola vez al cargar el módulo.
// Prueba rutas en orden: dist/public/ (Railway/prod) → cwd/public/ (preview local)
const logoBase64 = (() => {
  const candidates = [
    path.join(__dirname, '..', '..', '..', 'public', 'logo-side-white.png'), // dist/public/
    path.join(process.cwd(), 'public', 'logo-side-white.png'),               // preview local
  ];
  for (const logoPath of candidates) {
    try {
      return `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;
    } catch {
      continue;
    }
  }
  return '';
})();

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
            <Img
              src={logoBase64}
              alt="Finantrack"
              height={28}
              width={110}
            />
          </Section>

          <Hr style={styles.divider} />

          {/* Contenido */}
          <Section style={styles.content}>
            {children}
          </Section>

          {/* Footer */}
          <Hr style={styles.divider} />
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} Finantrack. Todos los derechos reservados.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: C.bodyBg,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: '40px 0',
  },
  container: {
    backgroundColor: C.containerBg,
    borderRadius: '12px',
    border: `1px solid ${C.border}`,
    maxWidth: '520px',
    margin: '0 auto',
    overflow: 'hidden',
  },
  header: {
    padding: '24px 32px',
  },
  divider: {
    borderColor: C.border,
    margin: '0',
  },
  content: {
    padding: '32px',
  },
  footer: {
    padding: '16px 32px',
  },
  footerText: {
    color: C.textMuted,
    fontSize: '12px',
    lineHeight: '1.5',
    margin: '0',
    textAlign: 'center' as const,
  },
};

export { C };
