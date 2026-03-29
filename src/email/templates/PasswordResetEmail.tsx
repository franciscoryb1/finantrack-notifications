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

      <Text style={styles.title}>Restablecer contraseña</Text>

      <Text style={styles.text}>
        Recibimos una solicitud para restablecer la contraseña de tu cuenta en{' '}
        <strong>Finantrack</strong>. Hacé clic en el botón para crear una nueva contraseña.
      </Text>

      <Section style={styles.buttonSection}>
        <EmailButton href={resetUrl}>
          Restablecer contraseña
        </EmailButton>
      </Section>

      <Section style={styles.noteBox}>
        <Text style={styles.noteText}>
          Este enlace expira en <strong>1 hora</strong>.
          Si no solicitaste restablecer tu contraseña, podés ignorar este email.
        </Text>
      </Section>

    </EmailLayout>
  );
}

PasswordResetEmail.PreviewProps = {
  resetUrl: 'http://localhost:3001/reset-password?token=abc123',
} as Props;

export default PasswordResetEmail;

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
    margin: '0 0 24px 0',
  },
  buttonSection: {
    margin: '0 0 24px 0',
  },
  noteBox: {
    borderTop: '1px solid #e4e4e7',
    paddingTop: '16px',
  },
  noteText: {
    fontSize: '13px',
    color: '#a1a1aa',
    margin: '0',
    lineHeight: '1.6',
  },
};
