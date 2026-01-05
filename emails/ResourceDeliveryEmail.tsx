import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

interface ResourceDeliveryEmailProps {
  nombreRecurso: string;
  linkDescarga: string;
}

export const ResourceDeliveryEmail = ({
  nombreRecurso,
  linkDescarga,
}: ResourceDeliveryEmailProps) => (
  <Html>
    <Head />
    <Preview>Tu recurso: {nombreRecurso}</Preview>
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
            Material Descargable
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
            Tu material_ <br />
            <span style={{ color: "#4b673e" }}>{nombreRecurso}</span>
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              lineHeight: "26px",
              color: "#44403c",
              marginBottom: "32px",
            }}
          >
            ¡Hola! Gracias por tu interés en los materiales de ConSentido
            Cognitivo. Acá tenés el acceso directo a tu recurso en formato PDF
            listo para usar.
          </Text>

          <Section style={{ textAlign: "center", marginBottom: "32px" }}>
            <Button
              href={linkDescarga}
              style={{
                backgroundColor: "#4b673e",
                borderRadius: "100px",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "900",
                textDecoration: "none",
                textAlign: "center",
                display: "inline-block",
                padding: "20px 40px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Descargar Material ahora_
            </Button>
          </Section>

          <Hr style={{ borderTop: "1px solid #e7e5e4", margin: "32px 0" }} />

          <Text
            style={{ fontSize: "14px", color: "#78716c", fontStyle: "italic" }}
          >
            Si tenés algún problema con la descarga, simplemente respondé a este
            email y te ayudamos enseguida.
          </Text>
        </Section>

        <Text
          style={{
            textAlign: "center",
            color: "#a8a29e",
            fontSize: "12px",
            marginTop: "32px",
          }}
        >
          ConSentido Cognitivo • Salud Mental para Adultos Mayores
        </Text>
      </Container>
    </Body>
  </Html>
);

const Hr = ({ style }: { style: React.CSSProperties }) => <hr style={style} />;

export default ResourceDeliveryEmail;
