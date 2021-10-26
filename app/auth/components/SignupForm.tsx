import { Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Card, CardMedia, CardContent } from "@mui/material"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="coolContainer">
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: "50px",
        }}
      >
        <Card sx={{ maxWidth: 345 }} style={{ margin: "0 auto" }}>
          <CardMedia
            component="img"
            height="160"
            image="https://images8.alphacoders.com/679/thumb-1920-679478.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Form
              submitText="Create Account"
              schema={Signup}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                try {
                  await signupMutation(values)
                  props.onSuccess?.()
                } catch (error: any) {
                  if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                    // This error comes from Prisma
                    return { email: "This email is already being used" }
                  } else {
                    return { [FORM_ERROR]: error.toString() }
                  }
                }
              }}
            >
              <LabeledTextField name="email" label="Email" placeholder="Email" />
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
            </Form>
            <div style={{ marginTop: "1rem" }}>
              Or <Link href={Routes.LoginPage()}>Log In</Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <style jsx global>{`
        .coolContainer {
          height: 85vh;
        }
      `}</style>
    </div>
  )
}

export default SignupForm
