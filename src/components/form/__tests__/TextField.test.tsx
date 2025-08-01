import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "../TextField";

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
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
    expect(input).toBeInTheDocument();
  });

  it("accepts user input", () => {
    render(
      <TestWrapper>
        <TextField name="test" />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test value" } });

    expect(input.value).toBe("test value");
  });

  it("renders with different input types", () => {
    const { rerender } = render(
      <TestWrapper>
        <TextField name="email" type="email" />
      </TestWrapper>
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");

    rerender(
      <TestWrapper>
        <TextField name="password" type="password" />
      </TestWrapper>
    );

    expect(screen.getByDisplayValue("")).toHaveAttribute("type", "password");
  });

  it("renders input with correct attributes", () => {
    render(
      <TestWrapper>
        <TextField name="test" placeholder="Test input" type="text" />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "test");
    expect(input).toHaveAttribute("placeholder", "Test input");
    expect(input).toHaveAttribute("type", "text");
  });
});
