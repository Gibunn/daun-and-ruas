import { act, renderHook, waitFor } from "@testing-library/react";
import { signUp } from "../sign-up-actions";
import { useSignUp } from "../sign-up-hooks/useSignUp";
import { useSignUpForm } from "../sign-up-hooks/useSignUpForm";

jest.mock("../sign-up-actions", () => ({
  signUp: jest.fn(),
}));

jest.mock("../sign-up-hooks/useSignUpForm", () => ({
  useSignUpForm: jest.fn(),
}));

const mockedSignUp = signUp as jest.MockedFunction<typeof signUp>;
const mockedUseSignUpForm = useSignUpForm as jest.MockedFunction<
  typeof useSignUpForm
>;

describe("useSignUp", () => {
  const fakeFormData = {
    name: "Gibun",
    email: "gibun@test.com",
    password: "secret123",
    confirmPassword: "secret123",
  };

  const mockRegister = jest.fn();
  const mockWatch = jest.fn();
  const mockSetValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseSignUpForm.mockReturnValue({
      register: mockRegister,
      watch: mockWatch,
      setValue: mockSetValue,
      handleSubmit: (onValid: any) => async (e?: any) => {
        e?.preventDefault?.();
        return onValid(fakeFormData);
      },
      formState: { errors: {} },
    } as any);
  });

  it("calls signUp action with form data on submit", async () => {
    mockedSignUp.mockResolvedValue({ success: true } as any);

    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.event.onSubmit();
    });

    await waitFor(() => {
      expect(mockedSignUp).toHaveBeenCalledWith(null, fakeFormData);
    });
  });

  it("sets isPending true while submitting, then false after resolve", async () => {
    let resolveSignUp: (value: any) => void;
    mockedSignUp.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSignUp = resolve;
        }),
    );

    const { result } = renderHook(() => useSignUp());

    expect(result.current.action.isPending).toBe(false);

    act(() => {
      result.current.event.onSubmit();
    });

    await waitFor(() => {
      expect(result.current.action.isPending).toBe(true);
    });

    act(() => {
      resolveSignUp({ success: true });
    });

    await waitFor(() => {
      expect(result.current.action.isPending).toBe(false);
    });
  });

  it("updates state with the result returned from signUp", async () => {
    mockedSignUp.mockResolvedValue({
      error: "Email already registered",
    } as any);

    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.event.onSubmit();
    });

    await waitFor(() => {
      expect(result.current.action.state).toEqual({
        error: "Email already registered",
      });
    });
  });

  it("exposes register, watch, setValue, and errors from the form hook", () => {
    const { result } = renderHook(() => useSignUp());

    expect(result.current.reactHookForm.register).toBe(mockRegister);
    expect(result.current.reactHookForm.watch).toBe(mockWatch);
    expect(result.current.reactHookForm.setValue).toBe(mockSetValue);
    expect(result.current.reactHookForm.errors).toEqual({});
  });

  it("reflects validation errors from useSignUpForm", () => {
    const fakeErrors = {
      email: { type: "required", message: "Email is required" },
    };

    mockedUseSignUpForm.mockReturnValue({
      register: mockRegister,
      watch: mockWatch,
      setValue: mockSetValue,
      handleSubmit: (onValid: any) => async () => onValid(fakeFormData),
      formState: { errors: fakeErrors },
    } as any);

    const { result } = renderHook(() => useSignUp());

    expect(result.current.reactHookForm.errors).toEqual(fakeErrors);
  });

  it("does not call signUp when form validation fails (handleSubmit blocks it)", async () => {
    mockedUseSignUpForm.mockReturnValue({
      register: mockRegister,
      watch: mockWatch,
      setValue: mockSetValue,
      handleSubmit: () => async () => {},
      formState: {
        errors: { email: { type: "required", message: "Required" } },
      },
    } as any);

    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.event.onSubmit();
    });

    expect(mockedSignUp).not.toHaveBeenCalled();
  });
});
