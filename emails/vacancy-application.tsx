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

interface VacancyApplicationProps {
  vacancy: {
    id: string,
    name: string
  },
  applicant: {
    id: string,
  }
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const VacancyApplication = ({
  vacancy,
  applicant,
}: VacancyApplicationProps) => (
  <Html>
    <Head />
    <Preview>Новый отклик на вакансию</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Новый отклик на вакансию</Heading>
        <Text
          style={{
            ...text,
            marginTop: "14px",
            marginBottom: "16px",
          }}
        >
          На вашу вакансию{" "}
          <Link
            href={`${baseUrl}/vacancies/my/${vacancy.id}`}
            target="_blank"
            style={{
              ...link,
              marginBottom: "16px",
            }}
          >
            {vacancy.name}
          </Link>
          {" "}
          откликнулись.
        </Text>
        <Link
          href={`${baseUrl}/candidates/${applicant.id}`}
          target="_blank"
          style={{
            ...link,
            display: "block",
            marginBottom: "16px",
          }}
        >
          Перейдите по ссылке чтобы увидеть кандидата
        </Link>
      </Container>
    </Body>
  </Html>
);

VacancyApplication.PreviewProps = {
  vacancy: {
    id: "clu36ken20002fsag5l2svq70",
    name: "National Paradigm Developer",
  },
  applicant: {
    id: "clu36pj4q0002zuzc7p6rw3ve",
  }
} as VacancyApplicationProps;

export default VacancyApplication;

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