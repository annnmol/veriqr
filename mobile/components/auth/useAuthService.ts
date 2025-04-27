import { useSignUp, useSignIn, useClerk } from "@clerk/clerk-expo";

type SignupParams = {
  emailAddress: string;
  password: string;
  firstName?: string;
};

type VerifyParams = {
  code: string;
};

type SignInParams = {
  email: string;
  password: string;
};

type UpdatePasswordParams = {
  newPassword: string;
};

type ResetPasswordParams = {
  email: string;
};

type VerifyResetParams = {
  code: string;
  newPassword: string;
};

function useAuthService() {
  const { isLoaded: isSignUpLoaded, signUp, setActive } = useSignUp();
  const {
    isLoaded: isSignInLoaded,
    signIn,
    setActive: setActiveLogin,
  } = useSignIn();
  const { signOut, user: currentUser } = useClerk();

  /**
   * Sign up user with email and password, and initiate email verification.
   */
  const signupWithEmailPass = async ({
    emailAddress,
    password,
    firstName,
  }: SignupParams): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      if (!isSignUpLoaded) return reject(new Error("Sign-up not ready"));

      try {
        // Start sign-up process using email and password provided
        const result = await signUp?.create({
          emailAddress,
          password,
          firstName,
        });

        console.log(
          `🚀 ~ returnnewPromise ~ result:`,
          result?.status,
          result?.requiredFields
        );
        console.log(`🚀 ~ returnnewPromise ~ result:full`, result);

        // if (result.status !== "complete") {
        //   return reject(new Error("Sign-up not complete"));
        // }
        // Send user an email with verification code
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Verify email with the OTP code sent during signup.
   */
  const verifyEmailOTP = ({ code }: VerifyParams): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      if (!isSignUpLoaded) return reject(new Error("Sign-up not ready"));

      try {
        // Use the code the user provided to attempt verification
        const verified = await signUp.attemptEmailAddressVerification({
          code,
        });

        // If verification was completed, set the session to active
        if (verified.status === "complete") {
          await setActive({ session: verified?.createdSessionId });
          resolve(verified);
        } else {
          // Verification failed.
          console.error(JSON.stringify(verified, null, 2));
          reject(new Error("Verification not complete"));
        }
        resolve(verified);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Sign in user with email and password.
   */
  const signInWithEmailPass = ({
    email,
    password,
  }: SignInParams): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      if (!isSignInLoaded) return reject(new Error("Sign-in not ready"));

      try {
        const result = await signIn?.create({ identifier: email, password });

        if (result.status !== "complete") {
          return reject(new Error("Sign-in not complete"));
        }

        await setActiveLogin({ session: result.createdSessionId });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Sign out current user session.
   */
  const logout = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await signOut();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Update password for logged-in user.
   */
  const updatePassword = ({
    newPassword,
  }: UpdatePasswordParams): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = currentUser;

        if (!user) throw new Error("User not found");

        const result = await user?.updatePassword({ newPassword });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Request a password reset email.
   */
  const resetPasswordRequest = ({
    email,
  }: ResetPasswordParams): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      if (!isSignInLoaded) return reject(new Error("Sign-in not ready"));

      try {
        const result = await signIn?.create({ identifier: email });

        if (result.status !== "complete") {
          return reject(new Error("Sign-in not complete"));
        }

        const result2 = await result?.prepareFirstFactor({
          strategy: "reset_password_email_code",
          emailAddressId: email,
        });

        if (result2.status !== "complete") {
          return reject(new Error("Password reset request not complete"));
        }

        resolve(result2);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Verify password reset code and set new password.
   */
  const verifyResetPassword = ({
    code,
    newPassword,
  }: VerifyResetParams): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      if (!isSignInLoaded) return reject(new Error("Sign-in not ready"));

      try {
        const result = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
          password: newPassword,
        });

        if (result?.createdSessionId) {
          await setActiveLogin({ session: result.createdSessionId });
        }

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };

  return {
    signupWithEmailPass,
    verifyEmailOTP,
    signInWithEmailPass,
    logout,
    updatePassword,
    resetPasswordRequest,
    verifyResetPassword,
  };
}

export default useAuthService;
