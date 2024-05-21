import React from 'react'
import MaxWidthWrapper from './MaxWithWrapper'
import { OrganizationSwitcher, SignInButton, UserButton } from '@clerk/clerk-react'
import { SignedOut } from '@clerk/nextjs'
import { Button } from './button'

export default function Header() {
  return (
    <div className='w-full h-16 items-center border-b flex justify-between'>
        <h1 className='text-xl font-bold'>docs drive</h1>
        <div className='felx space-x-3'>
        <OrganizationSwitcher /> 
        <UserButton />
        <SignedOut>
          <SignInButton>
            <Button>sign in</Button>
          </SignInButton>
        </SignedOut>
        </div>
    </div>
  )
}
