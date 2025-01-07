import {
    Fieldset,
    NumberInput,
    TextInput,
    NativeSelect,
    Button,
    Alert,
} from "@mantine/core";
import axios from "axios";
import { TransformedValues, zodResolver } from "@mantine/form";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import styles from "../styles/App.module.css";
import { string, z } from "zod";
import { useState } from "react";

function CreatePatientForm() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); 

    const schema = z.object({
        name: z.string().min(1),
        age: z.number().min(0),
        nric: z.string().regex(new RegExp(/[A-Z]\d{7}[A-Z]/)),
        gender: z.string().min(1, { message: "Choose a gender" }),
        date_of_birth: z.date().max(new Date()),
    });

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            age: 0,
            nric: "",
            gender: "",
            date_of_birth: new Date,
        },
        validate: zodResolver(schema),
        transformValues: (values) => ({
            ...values,
            gender: values.gender === "Male"
                ? "M"
                : values.gender === "Female"
                ? "F"
                : "",
            date_of_birth: values.date_of_birth.toISOString().split("T")[0]
        })
    });

    const handleSubmit = (values: TransformedValues<typeof form>) => {
        console.log(values);
        if (Object.keys(form.errors).length === 0) {
            axios
                .post(
                    import.meta.env.VITE_API_URL + "/api/patients/",
                    values
                )
                .then((response) => {
                    console.log(response);
                    setSuccessMessage("Patient successfully created!");
                    setErrorMessage(null);
                    form.reset();
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessage(
                        "An error occurred while creating the patient. Please try again."
                    );
                    setSuccessMessage(null);
                });
        } else {
            console.log("Form has validation errors:", form.errors);
            setErrorMessage("Please fill in all required fields correctly.");
            setSuccessMessage(null);
        }
    };
    return (
        <>
            <h1>Create Patient</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Fieldset className={styles.form}>
                    <TextInput
                        key={form.key("name")}
                        size="sm"
                        placeholder="Name"
                        label="Name"
                        className={styles.input}
                        {...form.getInputProps("name")}
                    />
                    <NumberInput
                        key={form.key("age")}
                        size="sm"
                        placeholder="Age"
                        label="Age"
                        className={styles.input}
                        {...form.getInputProps("age")}
                    />
                    <TextInput
                        key={form.key("nric")}
                        size="sm"
                        placeholder="Nric"
                        label="Nric"
                        className={styles.input}
                        {...form.getInputProps("nric")}
                    />
                    <NativeSelect
                        key={form.key("gender")}
                        label="Gender"
                        data={["", "Male", "Female"]}
                        className={styles.input}
                        {...form.getInputProps("gender")}
                    />
                    <DateInput
                        key={form.key("date_of_birth")}
                        size="sm"
                        placeholder="Date of birth"
                        label="Date of birth"
                        valueFormat="DD/MM/YYYY"
                        className={styles.input}
                        {...form.getInputProps("date_of_birth")}
                    />
                </Fieldset>
                <Button className={styles.button} type="submit">
                    Submit
                </Button>
                <Button
                    className={styles.button}
                    type="reset"
                    onClick={() => {
                        form.reset()
                        setErrorMessage(null)
                        setSuccessMessage(null)
                    }}
                >
                    Reset
                </Button>
            </form>
            {successMessage && (
                <Alert
                    title="Success!"
                    color="green"
                    style={{ marginTop: "20px" }}
                    onClose={() => setSuccessMessage(null)} // Close the success message
                >
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert
                    title="Error!"
                    color="red"
                    style={{ marginTop: "20px" }}
                    onClose={() => setErrorMessage(null)} // Close the error message
                >
                    {errorMessage}
                </Alert>
            )}
        </>
    );
}

export default CreatePatientForm;
