import { Text, Section } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { EmailButton } from './components/EmailButton';

type Props = {
  firstName: string;
  appUrl: string;
};

export function WelcomeEmail({ firstName, appUrl }: Props) {
  return (
    <EmailLayout preview={`¡Bienvenido a Finantrack, ${firstName}!`}>

      <Text style={styles.greeting}>¡Hola, {firstName}! 👋</Text>

      <Text style={styles.text}>
        Tu cuenta en <strong>Finantrack</strong> fue creada exitosamente.
        Ya podés empezar a registrar tus ingresos, gastos y tarjetas de crédito
        en un solo lugar.
      </Text>

      <Text style={styles.text}>
        Con Finantrack podés:
      </Text>

      <Section style={styles.featureList}>
        <Text style={styles.featureItem}>📊 &nbsp;Ver tu balance en tiempo real</Text>
        <Text style={styles.featureItem}>💳 &nbsp;Gestionar tus tarjetas y cuotas</Text>
        <Text style={styles.featureItem}>🔁 &nbsp;Registrar gastos fijos recurrentes</Text>
        <Text style={styles.featureItem}>🏷️ &nbsp;Organizar movimientos con etiquetas</Text>
      </Section>

      <Section style={styles.buttonSection}>
        <EmailButton href={appUrl}>
          Ir a Finantrack
        </EmailButton>
      </Section>

      <Text style={styles.footer}>
        Si no creaste esta cuenta, podés ignorar este email.
      </Text>

    </EmailLayout>
  );
}

// Preview para react-email dev server
WelcomeEmail.PreviewProps = {
  firstName: 'Francisco',
  appUrl: 'http://localhost:3001',
} as Props;

export default WelcomeEmail;

const styles: Record<string, React.CSSProperties> = {
  greeting: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 16px 0',
  },
  text: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#3f3f46',
    margin: '0 0 16px 0',
  },
  featureList: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e4e4e7',
    padding: '16px 20px',
    margin: '0 0 24px 0',
  },
  featureItem: {
    fontSize: '14px',
    color: '#3f3f46',
    margin: '0 0 8px 0',
    lineHeight: '1.5',
  },
  buttonSection: {
    margin: '0 0 24px 0',
  },
  footer: {
    fontSize: '13px',
    color: '#a1a1aa',
    margin: '0',
  },
};
