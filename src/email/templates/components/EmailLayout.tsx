import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
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
            <Row>
              <Column style={styles.logoColumn}>
                <table style={styles.logoBox} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td style={styles.logoCell}>F</td>
                    </tr>
                  </tbody>
                </table>
              </Column>
              <Column>
                <Text style={styles.brandName}>Finantrack</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={styles.headerDivider} />

          {/* Contenido */}
          <Section style={styles.content}>
            {children}
          </Section>

          {/* Footer */}
          <Hr style={styles.footerDivider} />
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
    backgroundColor: '#f4f4f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: '32px 0',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e4e4e7',
    maxWidth: '520px',
    margin: '0 auto',
    overflow: 'hidden',
  },
  header: {
    padding: '20px 32px',
  },
  logoColumn: {
    width: '36px',
    paddingRight: '10px',
  },
  logoBox: {
    backgroundColor: '#0f172a',
    borderRadius: '6px',
    width: '28px',
    height: '28px',
  },
  logoCell: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '900',
    textAlign: 'center' as const,
    verticalAlign: 'middle',
    width: '28px',
    height: '28px',
    lineHeight: '28px',
  },
  brandName: {
    color: '#0f172a',
    fontSize: '17px',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '-0.3px',
    lineHeight: '28px',
  },
  headerDivider: {
    borderColor: '#e4e4e7',
    margin: '0',
  },
  content: {
    padding: '32px',
  },
  footerDivider: {
    borderColor: '#e4e4e7',
    margin: '0',
  },
  footer: {
    padding: '16px 32px',
  },
  footerText: {
    color: '#a1a1aa',
    fontSize: '12px',
    lineHeight: '1.5',
    margin: '0',
  },
};
