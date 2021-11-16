import { Styles } from "./Styles";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";

const CustomeTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomeCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField(props, "checkbox");
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomeSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log(field, meta);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

function CoreFormikAndYup() {
  return (
    <>
      <Styles>
        <Formik
          initialValues={{
            name: "ioiio",
            email: "",
            acceptedTerms: "",
            specialPower: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Must be a least 3 characters")
              .max(15, "Must be a least 15 or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid Email Address")
              .required("Required"),
            acceptedTerms: Yup.boolean()
              .required("Required")
              .oneOf([true], "You must accept the terms and conditions"),
            specialPower: Yup.string()
              .oneOf(
                ["flight", "invisibility", "wealth bad guy", "other"],
                "invalid speacial power"
              )
              .required("Required"),
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 3000);
            resetForm();
            setSubmitting(false);
          }}
        >
          {(props) => (
            <Form
            //   onChange={() => {
            //     console.log({
            //       dirty: props.dirty,
            //       errors: props.errors,
            //       isValid: props.isValid,
            //       touched: props.touched,
            //       values: props.values,
            //     });
            //   }}
            >
              <h1>SignUP</h1>
              <CustomeTextInput
                label={"Name"}
                name="name"
                type="text"
                placeholder="Frank"
              />
              <CustomeTextInput
                label={"email"}
                name="email"
                type="email"
                placeholder="frank@tank.com"
              />
              <CustomeSelect label="Special Power" name="specialPower">
                <option disabled selected>
                  Select a Special Power
                </option>
                <option value="flight">flight</option>
                <option value="invisibility">invisibility</option>
                <option value="wealth bad guy">wealth bad guy</option>
                <option value="other">other</option>
              </CustomeSelect>
              <CustomeCheckbox name="acceptedTerms">
                I accept the terms and conditions
              </CustomeCheckbox>
              <button type="submit">
                {props.isSubmitting ? "Loding..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </Styles>
    </>
  );
}
export default CoreFormikAndYup;
