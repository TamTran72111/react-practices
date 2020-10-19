import React from "react";
import Accordion from "../components/accordion";
import OptForm from "../components/opt-form";
import faqsData from "../fixtures/faqs.json";

const FaqsContainer = () => {
  return (
    <Accordion>
      <Accordion.Title>Frequently Asked Questions</Accordion.Title>
      {faqsData.map((faq) => (
        <Accordion.Item key={faq.id}>
          <Accordion.Header>{faq.header}</Accordion.Header>
          <Accordion.Body>{faq.body}</Accordion.Body>
        </Accordion.Item>
      ))}

      <OptForm>
        <OptForm.Input placeholder="Email address" />
        <OptForm.Button>Try it now</OptForm.Button>
        <OptForm.Break />
        <OptForm.Text>
          Ready to watch? Enter your email to create or restart your membership
        </OptForm.Text>
      </OptForm>
    </Accordion>
  );
};

export default FaqsContainer;
