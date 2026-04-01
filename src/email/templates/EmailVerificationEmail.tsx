import { Text, Section } from '@react-email/components';
import * as React from 'react';
import { EmailLayout, C } from './components/EmailLayout';
import { EmailButton } from './components/EmailButton';

type Props = {
  firstName?: string;
  verifyUrl: string;
};

export function EmailVerificationEmail({ firstName, verifyUrl }: Props) {
  return (
    <EmailLayout preview="Verificá tu email de Finantrack">

      <Text style={styles.title}>{firstName ? `Hola, ${firstName}` : 'Hola'}</Text>

      <Text style={styles.text}>
        Tu cuenta en <strong style={styles.strong}>Finantrack</strong> fue creada exitosamente.
        Para activarla, verificá tu dirección de email haciendo clic en el botón de abajo.
      </Text>

      <Section style={styles.buttonSection}>
        <EmailButton href={verifyUrl}>
          Verificar mi email
        </EmailButton>
      </Section>

      <Section style={styles.noteBox}>
        <Text style={styles.noteText}>
          Este link es válido por <strong style={styles.strong}>24 horas</strong>.
          Si no creaste una cuenta en Finantrack, podés ignorar este email.
        </Text>
      </Section>

    </EmailLayout>
  );
}

EmailVerificationEmail.PreviewProps = {
  firstName: 'Francisco',
  verifyUrl: 'http://localhost:3001/verify-email?token=abc123',
} as Props;

export default EmailVerificationEmail;

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
