import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()

  if (session) {
    router.push('/tasks')
  } else {
    return (
      <>
        サインインしてください。 <br />
        <button onClick={() => signIn('google')}>Sign in</button>
      </>
    )
  }
}
