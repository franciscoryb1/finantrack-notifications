import { Text, Section } from '@react-email/components';
import * as React from 'react';
import { EmailLayout, C } from './components/EmailLayout';
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
        <strong style={styles.strong}>Finantrack</strong>. Hacé clic en el botón para crear una nueva contraseña.
      </Text>

      <Section style={styles.buttonSection}>
        <EmailButton href={resetUrl}>
          Restablecer contraseña
        </EmailButton>
      </Section>

      <Section style={styles.noteBox}>
        <Text style={styles.noteText}>
          Este enlace expira en <strong style={styles.strong}>1 hora</strong>.
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
    margin: '0 0 24px 0',
  },
  strong: {
    color: C.textPrimary,
  },
  buttonSection: {
    margin: '0 0 28px 0',
  },
  noteBox: {
    backgroundColor: 'rgba(139,92,246,0.08)',
    borderLeft: `3px solid ${C.primary}`,
    borderRadius: '0 6px 6px 0',
    padding: '12px 16px',
  },
  noteText: {
    fontSize: '13px',
    color: C.textMuted,
    margin: '0',
    lineHeight: '1.6',
  },
};
