import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'
import { PropsWithChildren } from 'react'

vi.mock("@clerk/nextjs", () => {
    const mockedFunctions = {
        auth: () => 
            new Promise((resolve) => resolve({userId: "user_29sdfuniaw870asdfnijasdf"})),
        ClerkProvider: ({ children }: PropsWithChildren<{}>) => <div>{children}</div>,
        useUser: () => ({
            isSignedIn: true,
            user: {
                id: "user_29sdfuniaw870asdfnijasdf",
                fullName: "Grant Cardone"
            }
        })
    }
    return mockedFunctions
})

vi.mock("next/font/google", () => {
    return {
        Inter: () => ({ className: "inter"})
    }
})

test(`Home`, async () => {
    render(await HomePage())
    expect(screen.getByText("This is the best app for tracking your mood throughout your life. Just write your thoughts the AI will detect the mood.")).toBeTruthy()
})