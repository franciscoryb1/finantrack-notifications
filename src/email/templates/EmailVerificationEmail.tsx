import { Text, Section } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { EmailButton } from './components/EmailButton';

type Props = {
  firstName: string;
  verifyUrl: string;
};

export function EmailVerificationEmail({ firstName, verifyUrl }: Props) {
  return (
    <EmailLayout preview={`Verificá tu email de Finantrack, ${firstName}`}>

      <Text style={styles.greeting}>¡Hola, {firstName}! 👋</Text>

      <Text style={styles.text}>
        Tu cuenta en <strong>Finantrack</strong> fue creada exitosamente.
        Para activarla y asegurar tu acceso, verificá tu dirección de email haciendo clic en el botón de abajo.
      </Text>

      <Section style={styles.buttonSection}>
        <EmailButton href={verifyUrl}>
          Verificar mi email
        </EmailButton>
      </Section>

      <Section style={styles.warningBox}>
        <Text style={styles.warningText}>
          ⏱ &nbsp;Este link es válido por <strong>24 horas</strong>.
        </Text>
        <Text style={styles.warningText}>
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
    margin: '0 0 24px 0',
  },
  buttonSection: {
    margin: '0 0 24px 0',
  },
  warningBox: {
    backgroundColor: '#fefce8',
    borderRadius: '8px',
    border: '1px solid #fde047',
    padding: '12px 16px',
    margin: '0',
  },
  warningText: {
    fontSize: '13px',
    color: '#713f12',
    margin: '0 0 6px 0',
    lineHeight: '1.5',
  },
};
