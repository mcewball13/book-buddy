import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "../TextField";

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("TextField", () => {
  it("renders label and input correctly", () => {
    render(
      <TestWrapper>
        <TextField
          name="test"
          label="Test Label"
          placeholder="Test Placeholder"
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });

  it("applies error styles when there is an error", () => {
    const methods = useForm({
      defaultValues: { test: "" },
    });
    methods.setError("test", {
      type: "required",
      message: "This field is required",
    });

    render(
      <FormProvider {...methods}>
        <TextField name="test" label="Test Label" />
      </FormProvider>
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
