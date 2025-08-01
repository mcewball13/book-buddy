import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "../TextField";

const TestWrapper = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
}) => {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("TextField component", () => {
  it("renders input with placeholder", () => {
    render(
      <TestWrapper>
        <TextField name="test" placeholder="Enter text here" />
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText("Enter text here");
    expect(input).toBeTruthy();
  });

  it("accepts user input", async () => {
    render(
      <TestWrapper>
        <TextField name="test" />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test value" } });

    await waitFor(() => {
      expect(input.value).toBe("test value");
    });
  });

  it("renders with different input types", () => {
    const { rerender } = render(
      <TestWrapper>
        <TextField name="email" type="email" />
      </TestWrapper>
    );

    const emailInput = screen.getByRole("textbox") as HTMLInputElement;
    expect(emailInput.type).toBe("email");

    rerender(
      <TestWrapper>
        <TextField name="password" type="password" />
      </TestWrapper>
    );

    const passwordInput = screen.getByDisplayValue("") as HTMLInputElement;
    expect(passwordInput.type).toBe("password");
  });

  it("renders input with correct attributes", () => {
    render(
      <TestWrapper>
        <TextField name="test" placeholder="Test input" type="text" />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.id).toBe("test");
    expect(input.placeholder).toBe("Test input");
    expect(input.type).toBe("text");
  });
});
