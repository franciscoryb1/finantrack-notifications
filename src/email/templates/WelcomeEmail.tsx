import { Text, Section } from '@react-email/components';
import * as React from 'react';
import { EmailLayout, C } from './components/EmailLayout';
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
        Tu cuenta en <strong style={styles.strong}>Finantrack</strong> está lista. Ya podés empezar a
        registrar tus ingresos, gastos y tarjetas de crédito en un solo lugar.
      </Text>

      <Section style={styles.featureList}>
        {[
          'Balance y movimientos en tiempo real',
          'Gestión de tarjetas de crédito y cuotas',
          'Gastos fijos recurrentes',
          'Etiquetas para organizar tus movimientos',
        ].map((item) => (
          <Text key={item} style={styles.featureItem}>
            <span style={styles.featureDot}>●</span> {item}
          </Text>
        ))}
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
    fontSize: '22px',
    fontWeight: '700',
    color: C.textPrimary,
    margin: '0 0 16px 0',
    letterSpacing: '-0.3px',
  },
  text: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: C.textBody,
    margin: '0 0 20px 0',
  },
  strong: {
    color: C.textPrimary,
  },
  featureList: {
    backgroundColor: 'rgba(139,92,246,0.08)',
    borderLeft: `3px solid ${C.primary}`,
    borderRadius: '0 6px 6px 0',
    padding: '12px 16px',
    margin: '0 0 28px 0',
  },
  featureItem: {
    fontSize: '14px',
    color: C.textBody,
    margin: '0 0 6px 0',
    lineHeight: '1.5',
  },
  featureDot: {
    color: C.primary,
    fontSize: '8px',
    verticalAlign: 'middle',
  },
  buttonSection: {
    margin: '0 0 24px 0',
  },
  note: {
    fontSize: '13px',
    color: C.textMuted,
    margin: '0',
  },
};
