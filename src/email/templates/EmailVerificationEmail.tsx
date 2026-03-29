import { Text, Section } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';
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
        Tu cuenta en <strong>Finantrack</strong> fue creada exitosamente.
        Para activarla, verificá tu dirección de email haciendo clic en el botón de abajo.
      </Text>

      <Section style={styles.buttonSection}>
        <EmailButton href={verifyUrl}>
          Verificar mi email
        </EmailButton>
      </Section>

      <Section style={styles.noteBox}>
        <Text style={styles.noteText}>
          Este link es válido por <strong>24 horas</strong>.
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
