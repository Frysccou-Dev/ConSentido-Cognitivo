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

interface WorkshopQueryEmailProps {
  nombre: string;
  email: string;
  taller: string;
  modalidad: string;
  mensaje: string;
}

export const WorkshopQueryEmail = ({
  nombre,
  email,
  taller,
  modalidad,
  mensaje,
}: WorkshopQueryEmailProps) => (
  <Html>
    <Head />
    <Preview>Consulta por Taller: {taller}</Preview>
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
              color: "#db2777",
              fontSize: "14px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            Consulta por Talleres
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
            {taller}_
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
              Modalidad
            </Text>
            <Text
              style={{
                margin: "0",
                color: "#1c1917",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {modalidad}
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
              Interesado/a
            </Text>
            <Text
              style={{
                margin: "0",
                color: "#1c1917",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {nombre}
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
              Email de Respuesta
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
              Consulta
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
          Sistema de Consultas • ConSentido Cognitivo
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WorkshopQueryEmail;
