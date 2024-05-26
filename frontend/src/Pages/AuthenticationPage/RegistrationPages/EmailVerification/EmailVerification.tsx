import  Button  from "react-bootstrap/Button";

const EmailVerification = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <h2>Email Verification Sent!</h2>
            <p>We've sent a verification email to your address. Please check your inbox and follow the instructions to complete the process.</p>
            <Button size='lg' className="button-black" href="/login">Back to Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
