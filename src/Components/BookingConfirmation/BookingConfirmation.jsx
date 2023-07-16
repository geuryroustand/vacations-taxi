import Container from "react-bootstrap/Container";

const BookingConfirmation = () => {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <h1>Booking Confirmation: Private Transfer</h1>
      <h2 style={{ marginTop: "1rem", fontSize: "1.6rem" }}>
        Thank you for booking your private transfer!
      </h2>
      <p>
        We&apos;re delighted to confirm your reservation for a private transfer. Your request has
        been successfully processed, and we&apos;re excited to provide you with a seamless and
        comfortable travel experience.
        {/* Please review the details below: */}
      </p>
      <p>
        We want to ensure that your journey begins smoothly, and to that end, we will be sending you
        an email confirmation shortly after booking. However, due to email filters and settings,
        it&apos;s possible that our message might end up in your spam or junk folder.
      </p>

      <p>
        If you haven&apos;t received your email confirmation some minutes after booking, or if you
        encounter any other issues, please don&apos;t hesitate to contact our customer support team.
      </p>

      {/* <h4>Booking Details:</h4>
      <ul>
        <li>
          <strong>Transfer Type:</strong> Private Transfer
        </li>
        <li>
          <strong>Pickup Date and Time:</strong> [Insert Date and Time]
        </li>
        <li>
          <strong>Pickup Location:</strong> [Insert Pickup Location]
        </li>
        <li>
          <strong>Drop-off Location:</strong> [Insert Drop-off Location]
        </li>
        <li>
          <strong>Number of Passengers:</strong> [Insert Number of Passengers]
        </li>
        <li>
          <strong>Vehicle Type:</strong> [Insert Vehicle Type]
        </li>
        <li>
          <strong>Special Requests:</strong> [Insert any special requests provided]
        </li>
      </ul>

      <h4>Payment Information:</h4>
      <ul>
        <li>
          <strong>Total Amount:</strong> [Insert Total Amount]
        </li>
        <li>
          <strong>Payment Method:</strong> [Insert Payment Method]
        </li>
        <li>
          <strong>Transaction ID:</strong> [Insert Transaction ID]
        </li>
      </ul> */}
      <h3>Important Instructions:</h3>
      <ol>
        <li>
          When arriving at <strong>Punta Cana Airport</strong> , we kindly advise you to exercise
          caution when dealing with airport staff. It has been observed that on occasion, they may
          attempt to redirect you to a different location, making it challenging to locate our
          designated driver. Their intention might be to encourage you to choose a more costly taxi
          service available within the airport premises. To ensure a smooth experience, we recommend
          staying vigilant and remaining at the designated meeting point with our driver, even if
          you require assistance from the airport staff.
        </li>
        <li>
          Upon your arrival, our designated driver will be waiting for you at the arrival gate,
          easily recognizable by a sign bearing your name.
        </li>
        <li>
          Please be ready at the designated pickup location at least 15 minutes before the scheduled
          pickup time.
        </li>
        <li>Ensure you have all your belongings with you before leaving the vehicle.</li>
        <li>
          In case of any changes or delays, we will notify you via the contact information provided
          during the booking process.
        </li>
        <li>
          If you have any additional questions or need assistance, please don&apos;t hesitate to
          contact our customer support team.
        </li>
      </ol>
      <p>
        We appreciate your trust in our services and look forward to serving you. Should you have
        any further inquiries or require any modifications, please reach out to our customer support
        team using the contact details provided below.
      </p>
      <p>
        Once again, thank you for choosing our private transfer service. We wish you a pleasant
        journey!
      </p>
      <p>Sincerely,</p>
      <p>VacationsTaxis</p>

      <p>
        Contact Information: <a href="tel:+13608607857 ">+1 (360) 860-7857 (USA)</a> or via email at{" "}
        <a href="mailto:info@vacationstaxis.com">info@vacationstaxis.com</a>.
      </p>
    </Container>
  );
};

export default BookingConfirmation;
