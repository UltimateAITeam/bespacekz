import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text,
  } from "@react-email/components";
  
  interface VerifyEmailProps {
    token?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  
  export const VerifyEmail = ({
    token,
  }: VerifyEmailProps) => (
    <Html>
      <Head />
      <Preview>Подтвердите ваш email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Подтвердите ваш email</Heading>
          <Link
            href={`${baseUrl}/api/verify_email?token=${token}`}
            target="_blank"
            style={{
              ...link,
              display: "block",
              marginBottom: "16px",
            }}
          >
            Перейдите по ссылке чтобы подтвердить ваш email
          </Link>
          <Text
            style={{
              ...text,
              color: "#ababab",
              marginTop: "14px",
              marginBottom: "16px",
            }}
          >
            Если вы не пытались подтвердить email, можете игнорировать это письмо.
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  VerifyEmail.PreviewProps = {
    token: "sparo-ndigo-amurt-secan",
  } as VerifyEmailProps;
  
  export default VerifyEmail;
  
  const main = {
    backgroundColor: "#ffffff",
  };
  
  const container = {
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "0 auto",
  };
  
  const h1 = {
    color: "#333",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0",
  };
  
  const link = {
    color: "#2754C5",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
  };
  
  const text = {
    color: "#333",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
  };