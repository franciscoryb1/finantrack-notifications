import { Text, Section } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { EmailButton } from './components/EmailButton';

type Props = {
  resetUrl: string;
};

export function PasswordResetEmail({ resetUrl }: Props) {
  return (
    <EmailLayout preview="Recuperá tu contraseña de Finantrack">

      <Text style={styles.title}>Recuperar contraseña</Text>

      <Text style={styles.text}>
        Recibimos una solicitud para restablecer la contraseña de tu cuenta en{' '}
        <strong>Finantrack</strong>.
      </Text>

      <Text style={styles.text}>
        Hacé clic en el botón para crear una nueva contraseña:
      </Text>

      <Section style={styles.buttonSection}>
        <EmailButton href={resetUrl}>
          Restablecer contraseña
        </EmailButton>
      </Section>

      <Section style={styles.warningBox}>
        <Text style={styles.warningText}>
          ⏱️ &nbsp;Este enlace expira en <strong>1 hora</strong>.
        </Text>
        <Text style={styles.warningText}>
          🔒 &nbsp;Si no solicitaste restablecer tu contraseña, podés ignorar este
          email. Tu cuenta sigue segura.
        </Text>
      </Section>

    </EmailLayout>
  );
}

// Preview para react-email dev server
PasswordResetEmail.PreviewProps = {
  resetUrl: 'http://localhost:3001/reset-password?token=abc123',
} as Props;

export default PasswordResetEmail;

const styles: Record<string, React.CSSProperties> = {
  title: {
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
  buttonSection: {
    margin: '0 0 24px 0',
  },
  warningBox: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    border: '1px solid #e4e4e7',
    borderLeft: '3px solid #f59e0b',
    padding: '14px 18px',
  },
  warningText: {
    fontSize: '13px',
    color: '#52525b',
    margin: '0 0 6px 0',
    lineHeight: '1.6',
  },
};
