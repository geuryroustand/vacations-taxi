import Link from "next/link";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";

import { useSelector } from "react-redux";

import styled from "./Faq.module.css";

const Faq = () => {
  const { locale } = useRouter();
  const queryKey = `fetchCommonContent("${locale}")`;

  const { faqHeading = "", faq = [] } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );

  return (
    <section className={styled.faq}>
      <h2 className={styled.heading}>{faqHeading}</h2>
      <Container>
        <Accordion as="ol" className={styled.accordion} defaultActiveKey="0" flush>
          {faq.map(({ id, question, answer }, index) => (
            <li key={id}>
              <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header>{question}</Accordion.Header>
                {index === faq.length - 1 ? (
                  <Accordion.Body>
                    <Link href="/contact-us" target="_blank">
                      {answer}
                    </Link>
                  </Accordion.Body>
                ) : (
                  <Accordion.Body>{answer}</Accordion.Body>
                )}
              </Accordion.Item>
            </li>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};

export default Faq;
