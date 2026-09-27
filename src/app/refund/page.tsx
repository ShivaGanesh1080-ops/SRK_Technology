export default function RefundPage() {
  return (
    <div className="min-h-screen py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Refund & Cancellation Policy</h1>
        <div className="prose prose-slate prose-lg max-w-none bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-200">
          <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong></p>
          
          <p>At SRK Technology, we strive to ensure a smooth and valuable educational experience. This policy outlines the terms regarding cancellations and refunds for our workshops and programs.</p>

          <h2>1. Cancellation by the Student</h2>
          <ul>
            <li><strong>Before Registration Deadline:</strong> If you cancel your enrollment before the official registration deadline of the specific workshop, you are eligible for a 100% refund.</li>
            <li><strong>After Registration Deadline:</strong> Once the registration deadline has passed and the cohort is locked, we do not offer refunds, as seats are limited and resources have already been allocated.</li>
            <li><strong>No Shows:</strong> If you fail to attend a workshop without prior notice, no refund will be issued.</li>
          </ul>

          <h2>2. Cancellation by SRK Technology</h2>
          <p>In the rare event that SRK Technology is forced to cancel or reschedule a workshop due to trainer unavailability, technical failures, or insufficient enrollments:</p>
          <ul>
            <li>Students will be notified immediately via email.</li>
            <li>Students will be offered the choice of a <strong>full 100% refund</strong> or a free transfer to the next available workshop cohort.</li>
            <li>Refunds initiated by us will be processed within 5-7 business days to the original payment method.</li>
          </ul>

          <h2>3. How to Request a Refund</h2>
          <p>To request a valid refund (prior to a registration deadline), please email us directly at <strong>srktechnology3527@gmail.com</strong> with your Name, Email, and Payment Transaction ID. Our team will review the request and process it accordingly.</p>
        </div>
      </div>
    </div>
  );
}
