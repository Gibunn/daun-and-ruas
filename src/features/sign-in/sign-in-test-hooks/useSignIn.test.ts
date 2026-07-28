import { act, renderHook, waitFor } from "@testing-library/react";
import { signIn } from "../sign-in-actions";
import { useSignIn } from "../sign-in-hooks/useSignIn";
import { useSignInForm } from "../sign-in-hooks/useSignInForm";

jest.mock("../sign-in-actions", () => ({
  signIn: jest.fn(),
}));

jest.mock("../sign-in-hooks/useSignInForm", () => ({
  useSignInForm: jest.fn(),
}));

const mockedSignIn = signIn as jest.MockedFunction<typeof signIn>;
const mockedUseSignInForm = useSignInForm as jest.MockedFunction<
  typeof useSignInForm
>;

describe("useSignIn", () => {
  const fakeFormData = { email: "gibun@test.com", password: "secret123" };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseSignInForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: (onValid: any) => async (e?: any) => {
        e?.preventDefault?.();
        return onValid(fakeFormData);
      },
    } as any);
  });

  it("calls signIn action with form data on submit", async () => {
    mockedSignIn.mockResolvedValue({ success: true } as any);

    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.event.onSubmit();
    });

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledWith(null, fakeFormData);
    });
  });

  it("sets pending true while submitting, then false after resolve", async () => {
    let resolveSignIn: (value: any) => void;
    mockedSignIn.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSignIn = resolve;
        }),
    );

    const { result } = renderHook(() => useSignIn());

    expect(result.current.action.pending).toBe(false);

    act(() => {
      result.current.event.onSubmit();
    });

    await waitFor(() => {
      expect(result.current.action.pending).toBe(true);
    });

    act(() => {
      resolveSignIn({ success: true });
    });

    await waitFor(() => {
      expect(result.current.action.pending).toBe(false);
    });
  });

  it("updates state with the result returned from signIn", async () => {
    mockedSignIn.mockResolvedValue({ error: "Invalid credentials" } as any);

    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.event.onSubmit();
    });

    await waitFor(() => {
      expect(result.current.action.state).toEqual({
        error: "Invalid credentials",
      });
    });
  });
});
