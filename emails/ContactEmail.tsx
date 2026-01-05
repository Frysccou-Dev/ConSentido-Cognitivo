import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  nombre: string;
  email: string;
  interes: string;
  mensaje: string;
}

export const ContactEmail = ({
  nombre,
  email,
  interes,
  mensaje,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>Nueva consulta de {nombre}</Preview>
    <Body
      style={{
        backgroundColor: "#fafaf9",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Container style={{ margin: "40px auto", width: "600px" }}>
        <Section
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            padding: "48px",
            border: "1px solid #e7e5e4",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          <Text
            style={{
              color: "#4b673e",
              fontSize: "14px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            Nueva Consulta Web
          </Text>
          <Heading
            style={{
              color: "#1c1917",
              fontSize: "32px",
              fontWeight: "900",
              margin: "0 0 32px 0",
              lineHeight: "1",
            }}
          >
            {nombre}_
          </Heading>

          <Section style={{ marginBottom: "32px" }}>
            <Text
              style={{
                margin: "0 0 8px 0",
                color: "#78716c",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Área de Interés
            </Text>
            <Text
              style={{
                margin: "0",
                color: "#1c1917",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {interes}
            </Text>
          </Section>

          <Section style={{ marginBottom: "32px" }}>
            <Text
              style={{
                margin: "0 0 8px 0",
                color: "#78716c",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Email de Contacto
            </Text>
            <Text
              style={{
                margin: "0",
                color: "#4b673e",
                fontSize: "18px",
                fontWeight: "600",
                textDecoration: "underline",
              }}
            >
              {email}
            </Text>
          </Section>

          <Hr style={{ borderTop: "1px solid #e7e5e4", margin: "32px 0" }} />

          <Section>
            <Text
              style={{
                margin: "0 0 12px 0",
                color: "#78716c",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Mensaje
            </Text>
            <Text
              style={{
                margin: "0",
                color: "#44403c",
                fontSize: "16px",
                lineHeight: "1.6",
                fontStyle: "italic",
              }}
            >
              &quot;{mensaje}&quot;
            </Text>
          </Section>
        </Section>

        <Text
          style={{
            textAlign: "center",
            color: "#a8a29e",
            fontSize: "12px",
            marginTop: "32px",
          }}
        >
          Enviado desde ConSentido Cognitivo • {new Date().toLocaleDateString()}
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;
