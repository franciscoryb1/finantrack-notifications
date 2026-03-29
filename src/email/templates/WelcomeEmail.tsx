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
    <EmailLayout preview={`Bienvenido a Finantrack, ${firstName}`}>

      <Text style={styles.title}>Bienvenido, {firstName}</Text>

      <Text style={styles.text}>
        Tu cuenta en <strong>Finantrack</strong> está lista. Ya podés empezar a
        registrar tus ingresos, gastos y tarjetas de crédito en un solo lugar.
      </Text>

      <Section style={styles.featureList}>
        <Text style={styles.featureItem}>Balance y movimientos en tiempo real</Text>
        <Text style={styles.featureItem}>Gestión de tarjetas de crédito y cuotas</Text>
        <Text style={styles.featureItem}>Gastos fijos recurrentes</Text>
        <Text style={styles.featureItem}>Etiquetas para organizar tus movimientos</Text>
      </Section>

      <Section style={styles.buttonSection}>
        <EmailButton href={appUrl}>
          Ir a Finantrack
        </EmailButton>
      </Section>

      <Text style={styles.note}>
        Si no creaste esta cuenta, podés ignorar este email.
      </Text>

    </EmailLayout>
  );
}

WelcomeEmail.PreviewProps = {
  firstName: 'Francisco',
  appUrl: 'http://localhost:3001',
} as Props;

export default WelcomeEmail;

const styles: Record<string, React.CSSProperties> = {
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 16px 0',
  },
  text: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#3f3f46',
    margin: '0 0 20px 0',
  },
  featureList: {
    borderLeft: '2px solid #e4e4e7',
    paddingLeft: '16px',
    margin: '0 0 24px 0',
  },
  featureItem: {
    fontSize: '14px',
    color: '#52525b',
    margin: '0 0 8px 0',
    lineHeight: '1.5',
  },
  buttonSection: {
    margin: '0 0 24px 0',
  },
  note: {
    fontSize: '13px',
    color: '#a1a1aa',
    margin: '0',
  },
};
